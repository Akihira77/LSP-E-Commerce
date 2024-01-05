import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.config.js";

export interface JwtAuthPayload {
    userId: number;
    username: string;
    email: string;
    role: "ADMIN" | "CUSTOMER";
}

const SECRET_KEY = JWT_SECRET!;

export function jwtSign(payload: JwtAuthPayload) {
    try {
        const token = jwt.sign(payload, SECRET_KEY);

        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function jwtVerify(token: string) {
    try {
        const result = <jwt.JwtAuthPayload>jwt.verify(token, SECRET_KEY);

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
