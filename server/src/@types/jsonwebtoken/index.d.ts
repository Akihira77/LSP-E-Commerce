import jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
    interface JwtAuthPayload extends jwt.JwtPayload {
        userId: string;
        username: string;
        email: string;
        role: string;
    }
}
