export interface IDatabaseConnection {
    connect(): Promise<void>;

    disconnect(): Promise<void>;
}
