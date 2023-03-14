import { IDatabaseConnection } from './IDatabaseConnection';

export class StubbedDatabaseConnection implements IDatabaseConnection {
    connect(): Promise<void> {
        return Promise.resolve();
    }

    disconnect(): Promise<void> {
        return Promise.resolve();
    }
}
