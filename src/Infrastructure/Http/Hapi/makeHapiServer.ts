import { HttpConfiguration } from '../../../Shared/Application/Configuration/AppConfiguration';
import { Server, server, ServerRoute } from '@hapi/hapi';
import { applyHapiRoutes } from './applyHapiRoutes';

export function makeHapiServer(config: HttpConfiguration, routes: ServerRoute[]): Server {
    let newServer: Server = server(config);

    applyHapiRoutes(newServer, routes);

    return newServer;
}
