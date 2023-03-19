import { CommandMap } from './CommandMap';
import { CommandRequest } from './CommandRequest';
import { CommandHandler } from './CommandHandler';
import { Middleware } from './Middleware/Middleware';
import { Result } from '../Result/Result';
import { ViewBag } from '../ViewBag/ViewBag';

export class CommandMediator {
    constructor(private readonly commandMap: CommandMap) {}

    async route(request: CommandRequest): Promise<Result<ViewBag>> {
        const commandEntry = this.commandMap[request.key];

        if (commandEntry.middleware) {
            const middlewareChain = this.chainMiddleware(commandEntry.middleware);

            const response = await middlewareChain.handle(request);
            if (response.ok === false) {
                return response;
            }
        }

        const commandFactory = this.commandMap[request.key].handler;
        const command: CommandHandler = commandFactory();

        return await command.handle(request);
    }

    private chainMiddleware(middleware: Middleware[]): Middleware {
        if (middleware.length === 0) {
            throw new Error('Cannot create Middleware chain from empty array');
        }

        let head: Middleware = null;
        let prevMiddleware: Middleware = null;

        for (let i = 0; i < middleware.length; i++) {
            if (i === 0) {
                head = middleware[i];
                prevMiddleware = middleware[i];
            } else {
                prevMiddleware.setNext(middleware[i]);
                prevMiddleware = middleware[i];
            }
        }

        return head;
    }
}
