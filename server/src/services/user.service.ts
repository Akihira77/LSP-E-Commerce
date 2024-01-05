import { db } from "../db/index.db";
import { users, addresses } from "../db/schema/index.schema";
import {
    CreateUserDtoType,
    FindUserByNameOrEmailParamsType,
    UpdateUserDtoType,
    UserDtoType
} from "../db/dtos/user/index.dto";
import { and, eq, like, or } from "drizzle-orm";
import { FindUserByIdParamsType } from "../db/dtos/user/common.dto";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { jwtSign } from "../utils/jwt";

export class UserService {
    constructor() {}

    async getAllIncludeAddress(): Promise<UserDtoType[]> {
        try {
            const rows: UserDtoType[] = await db
                .select({
                    id: users.id,
                    username: users.name,
                    email: users.email,
                    phoneNumber: users.phoneNumber,
                    role: users.role,
                    address: addresses
                })
                .from(users)
                .innerJoin(addresses, eq(addresses.userId, users.id));

            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getByNameOrEmail(
        request: FindUserByNameOrEmailParamsType
    ): Promise<UserDtoType | undefined> {
        try {
            const { name, email } = request;
            const filterName = like(users.name, `%${name}%`);
            const filterEmail = like(users.email, `%${email}%`);

            const rows = await db
                .select({
                    id: users.id,
                    username: users.name,
                    email: users.email,
                    phoneNumber: users.phoneNumber,
                    role: users.role
                })
                .from(users)
                .where(or(filterName, filterEmail));

            const user = rows[0];

            return user;
        } catch (error) {
            throw error;
        }
    }

    async getById(
        request: FindUserByIdParamsType
    ): Promise<UserDtoType | undefined> {
        try {
            const { id } = request;
            const rows: UserDtoType[] = await db
                .select({
                    id: users.id,
                    username: users.name,
                    email: users.email,
                    phoneNumber: users.phoneNumber,
                    role: users.role,
                    address: addresses
                })
                .from(users)
                .where(eq(users.id, id))
                .innerJoin(addresses, eq(addresses.userId, users.id));

            const user = rows[0];

            return user;
        } catch (error) {
            throw error;
        }
    }

    async add(request: CreateUserDtoType): Promise<boolean> {
        try {
            const { name, phoneNumber, email, password, address } = request;
            const encryptedPassword = await hashPassword(password);
            const result = await db.transaction(async (tx) => {
                const savedUsers = await tx
                    .insert(users)
                    .values({
                        name,
                        phoneNumber,
                        email,
                        password: encryptedPassword,
                        createdAt: new Date()
                    })
                    .returning({ insertedId: users.id });

                const savedUser = savedUsers[0]!;

                await tx.insert(addresses).values({
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    createdAt: new Date(),
                    userId: savedUser.insertedId
                });

                return savedUser;
            });

            return Boolean(result.insertedId);
        } catch (error) {
            throw error;
        }
    }

    async delete(request: FindUserByIdParamsType): Promise<boolean> {
        try {
            const { id } = request;
            const result = await db.delete(users).where(eq(users.id, id));

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, request: UpdateUserDtoType): Promise<boolean> {
        try {
            const { name, email, password, phoneNumber, address } = request;
            const encryptedPassword = await hashPassword(password);
            const result = await db.transaction(async (tx) => {
                const savedUsers = await tx
                    .update(users)
                    .set({
                        name,
                        phoneNumber,
                        email,
                        password: encryptedPassword
                    })
                    .where(eq(users.id, id))
                    .returning({ updatedId: users.id });

                const savedUser = savedUsers[0]!;

                if (address) {
                    await tx.update(addresses).set({
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode
                    });
                }

                return savedUser;
            });

            return Boolean(result.updatedId);
        } catch (error) {
            throw error;
        }
    }

    async updateRole(id: number, role: "ADMIN" | "CUSTOMER"): Promise<boolean> {
        try {
            const result = await db
                .update(users)
                .set({ role })
                .where(eq(users.id, id));

            return result.count > 0;
        } catch (error) {
            throw error;
        }
    }

    async generateTokenForLogin(
        emailRequest: string,
        passwordRequest: string
    ): Promise<boolean | string> {
        try {
            const rows = await db
                .select({
                    userId: users.id,
                    username: users.name,
                    email: users.email,
                    password: users.password,
                    role: users.role
                })
                .from(users)
                .where(eq(users.email, emailRequest))
                .limit(1);

            const { userId, username, email, password, role } = rows[0]!;

            const isValid = await comparePassword(passwordRequest, password);

            if (!isValid) {
                return isValid;
            }

            const token = jwtSign({ userId, email, role, username });

            return token;
        } catch (error) {
            throw error;
        }
    }
}
