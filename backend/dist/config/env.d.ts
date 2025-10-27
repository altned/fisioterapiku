export declare const config: {
    port: string | number;
    nodeEnv: string;
    databaseUrl: string;
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    cors: {
        origin: string;
    };
    upload: {
        maxFileSize: number;
        path: string;
    };
};
export declare const env: {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    CORS_ORIGIN: string;
    MAX_FILE_SIZE: number;
    UPLOAD_PATH: string;
};
//# sourceMappingURL=env.d.ts.map