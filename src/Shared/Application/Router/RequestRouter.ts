import { Request } from '../Command/Request';
import { ViewModel } from '../ViewModel/ViewModel';
import { CommandMap } from './CommandMap';

export class RequestRouter {
    constructor(private readonly map: CommandMap) {
    }

    route(request: Request): ViewModel {
        const handler = this.map[request.key];

        return handler.handle(request);
    }
}
