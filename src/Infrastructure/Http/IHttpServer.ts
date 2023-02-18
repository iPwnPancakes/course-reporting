export interface IHttpServer {
    start(): Promise<void>;

    stop(): Promise<void>;
}
