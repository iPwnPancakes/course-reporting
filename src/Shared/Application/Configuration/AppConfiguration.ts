export interface DatabaseConfiguration {
    type: 'mysql' | 'postgres' | 'sqlite';
    host: string;
    username: string;
    password: string;
    database: string;
    connector: 'mysql' | 'mysql2';
}

export class AppConfiguration {
    public isProduction(): boolean {
        return process.env.APP_ENV === 'production' || process.env.APP_ENV === 'prod';
    }

    public getDatabaseConfiguration(): DatabaseConfiguration {
        return {
            type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            connector: process.env.DB_CONNECTOR as 'mysql' | 'mysql2'
        };
    }
}
