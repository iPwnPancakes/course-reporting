import { DatabaseConfiguration } from '../../../Shared/Application/Configuration/AppConfiguration';
import { DataSource } from 'typeorm';
import { StudentEntity } from './Entities/StudentEntity';

export function makeDataSource(config: DatabaseConfiguration): DataSource {
    const { type, host, username, password, database } = config;

    return new DataSource({
        type,
        host,
        username,
        password,
        database,
        connectorPackage: 'mysql2',
        entities: [StudentEntity],
        migrations: ['src/Infrastructure/TypeOrm/Migrations/*.ts'],
        synchronize: false
    });
}

