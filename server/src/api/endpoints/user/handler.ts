import { Context } from "hono";
import { UserService } from "../../../services/index.service.js";
import { StatusCodes } from "../../../utils/constants.js";
import { JwtAuthPayload } from "../../../utils/jwt.js";
import { zValidator } from "@hono/zod-validator";
import {
    CreateUserDTO,
    UpdateRoleUserDTO,
    UpdateUserDTO,
    UserLoginDTO
} from "../../../db/dtos/user/index.dto.js";
import {
    CustomAPIError,
    ZValidationAPIError
} from "../../../errors/index.error.js";
import { setCookie } from "hono/cookie";

const userService = new UserService();

export const getAll = async (context: Context) => {
    try {
        const users = await userService.getAllIncludeAddress();

        context.status(StatusCodes.Ok200);
        return context.json({ users });
    } catch (error) {
        throw error;
    }
};

export const userStatus = async (context: Context) => {
    try {
        const { userId } = context.get("user") as JwtAuthPayload;
        const userFromDb = await userService.getById({ id: userId });

        context.status(StatusCodes.Ok200);
        return context.json({ user: userFromDb });
    } catch (error) {
        throw error;
    }
};

export const register = zValidator(
    "json",
    CreateUserDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                // console.log("ini error", validation.error);
                throw new ZValidationAPIError(validation.error);
            }

            const body = validation.data;
            const result = await userService.add(body);

            if (result) {
                return context.text("User Successfully Registered", {
                    status: StatusCodes.Created201
                });
            }

            return context.text("Registered Failed", {
                status: StatusCodes.BadRequest400
            });
        } catch (error) {
            throw error;
        }
    }
);

export const login = zValidator(
    "json",
    UserLoginDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const body = validation.data;
            const userFromDb = await userService.getByNameOrEmail({
                email: body.email
            });

            if (!userFromDb) {
                throw new CustomAPIError(
                    "User does not found",
                    StatusCodes.NotFound404
                );
            }

            const loginResult = await userService.generateTokenForLogin(
                body.email,
                body.password
            );

            if (typeof loginResult === "boolean") {
                throw new CustomAPIError(
                    "Email or Password is not correct",
                    StatusCodes.BadRequest400
                );
            }

            setCookie(context, "token", loginResult, {
                maxAge: 24 * 60 * 60 * 1000,
                path: "/"
            });

            context.status(StatusCodes.Ok200);
            return context.json({ user: userFromDb });
        } catch (error) {
            throw error;
        }
    }
);

export const removeUserByAdmin = async (context: Context) => {
    try {
        const id = parseInt(context.req.param("id"));
        const result = await userService.delete({ id });

        if (!result) {
            throw new CustomAPIError(
                `User ${id} does not found`,
                StatusCodes.NotFound404
            );
        }

        return context.text(`User ${id} successfully deleted`, {
            status: StatusCodes.Ok200
        });
    } catch (error) {
        throw error;
    }
};

export const remove = async (context: Context) => {
    try {
        const id = context.req.param("id");

        const result = await userService.delete({ id: parseInt(id) });

        if (!result) {
            throw new CustomAPIError(
                `User does not found`,
                StatusCodes.NotFound404
            );
        }

        return context.text("User successfully deleted", {
            status: StatusCodes.Ok200
        });
    } catch (error) {
        throw error;
    }
};

export const update = zValidator(
    "json",
    UpdateUserDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const body = validation.data;
            const { userId } = context.get("user") as JwtAuthPayload;

            const result = await userService.update(userId, body);

            if (!result) {
                throw new CustomAPIError(
                    "User update failed",
                    StatusCodes.InternalServerError500
                );
            }

            context.status(StatusCodes.Ok200);
            return context.json({ message: "User successfully updated" });
        } catch (error) {
            throw error;
        }
    }
);

export const updateRole = zValidator(
    "json",
    UpdateRoleUserDTO,
    async (validation, context: Context) => {
        try {
            if (!validation.success) {
                throw new ZValidationAPIError(validation.error);
            }

            const { id, role } = validation.data;
            const result = await userService.updateRole(id, role);

            context.status(StatusCodes.Ok200);
            return context.json({ message: "User role successfully updated" });
        } catch (error) {
            throw error;
        }
    }
);
