import { DataSource } from 'typeorm';
import { IDatabaseConnection } from './IDatabaseConnection';

export class TypeOrmDatabaseConnection implements IDatabaseConnection {
    constructor(private readonly dataSource: DataSource) {
    }

    async connect(): Promise<void> {
        await this.dataSource.initialize();
    }

    async disconnect(): Promise<void> {
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
        }
    }
}
