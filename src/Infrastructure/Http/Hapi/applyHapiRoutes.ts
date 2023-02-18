import { Server, ServerRoute } from '@hapi/hapi';

export function applyHapiRoutes(server: Server, routes: ServerRoute[]): Server {
    for (let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }

    return server;
}
