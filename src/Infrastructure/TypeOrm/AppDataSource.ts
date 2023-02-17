import { DataSource } from 'typeorm';
import { StudentEntity } from './Entities/StudentEntity';

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [StudentEntity],
    connectorPackage: process.env.DB_CONNECTOR as 'mysql' | 'mysql2',
    migrations: ['src/Infrastructure/TypeOrm/Migrations/*.ts'],
    synchronize: false
});