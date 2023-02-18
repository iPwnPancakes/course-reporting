import { IHttpServer } from './IHttpServer';

export class StubbedHttpServer implements IHttpServer {
    start(): Promise<void> {
        return Promise.resolve();
    }
}
