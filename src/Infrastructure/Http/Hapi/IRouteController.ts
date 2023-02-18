import { ServerRoute } from '@hapi/hapi';

export interface IRouteController {
    getRoutes(): ServerRoute[];
}
