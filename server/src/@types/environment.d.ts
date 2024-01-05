export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            JWT_SECRET: string;
            POSTGRES_URI: string;
            NODE_ENV: string;
        }
    }
}
