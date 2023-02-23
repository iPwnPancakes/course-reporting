// Should not be used anywhere else in the code, is purely here for running typeorm CLI migrations
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { StudentEntity } from './Entities/StudentEntity';

export const MigrationDataSource = new DataSource({
    type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [StudentEntity],
    connectorPackage: 'mysql2' as 'mysql' | 'mysql2',
    migrations: ['src/Infrastructure/DatabaseConnection/TypeOrm/Migrations/*.ts'],
    synchronize: false
});
