import { RequestRouter } from './Shared/Application/Router/RequestRouter';
import { ViewModel } from './Shared/Application/ViewModel/ViewModel';
import { Request } from './Shared/Application/Command/Request';

export class App {
    constructor(private readonly router: RequestRouter) {
    }

    route(request: Request): ViewModel {
        return this.router.route(request);
    }
}
