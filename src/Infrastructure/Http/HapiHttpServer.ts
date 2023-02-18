import { Server } from '@hapi/hapi';
import { IHttpServer } from './IHttpServer';

export class HapiHttpServer implements IHttpServer {
    constructor(private readonly hapiServer: Server) {
    }

    async start(): Promise<void> {
        await this.hapiServer.start();
    }
}
