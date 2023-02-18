import { HttpConfiguration } from '../../../Shared/Application/Configuration/AppConfiguration';
import { Server, server } from '@hapi/hapi';

export function makeHapiServer(config: HttpConfiguration): Server {
    return server(config);
}
