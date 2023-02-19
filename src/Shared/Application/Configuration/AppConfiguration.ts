export interface DatabaseConfiguration {
    type: 'mysql' | 'postgres' | 'sqlite';
    host: string;
    username: string;
    password: string;
    database: string;
}

export interface HttpConfiguration {
    host: string,
    port: number;
}

export class AppConfiguration {
    public isProduction(): boolean {
        return process.env.APP_ENV === 'production' || process.env.APP_ENV === 'prod';
    }

    public getHttpConfiguration(): HttpConfiguration {
        return {
            host: process.env.HOST,
            port: Number(process.env.PORT)
        };
    }

    public getDatabaseConfiguration(): DatabaseConfiguration {
        return {
            type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };
    }
}
