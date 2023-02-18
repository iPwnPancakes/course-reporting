import { IHttpServer } from './IHttpServer';

export class StubbedHttpServer implements IHttpServer {
    start(): Promise<void> {
        return Promise.resolve();
    }

    stop(): Promise<void> {
        return Promise.resolve();
    }
}
