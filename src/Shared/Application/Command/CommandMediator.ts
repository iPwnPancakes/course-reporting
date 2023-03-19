import { CommandMap } from './CommandMap';
import { CommandRequest } from './CommandRequest';
import { Middleware } from './Middleware/Middleware';
import { Result } from '../Result/Result';
import { ViewBag } from '../ViewBag/ViewBag';
import { CommandHandler } from './CommandHandler';

export class CommandMediator {
    constructor(private readonly commandMap: CommandMap) {}

    async route(request: CommandRequest): Promise<Result<ViewBag>> {
        const commandEntry = this.commandMap[request.key];

        if (commandEntry.middleware) {
            const middlewareChain = this.chainMiddleware(commandEntry.middleware, commandEntry.handler);
            return await middlewareChain.handle(request);
        }

        return await commandEntry.handler.handle(request);
    }

    private chainMiddleware(middleware: Middleware[], command: CommandHandler): Middleware {
        if (middleware.length === 0) {
            throw new Error('Cannot create Middleware chain from empty array');
        }

        let head: Middleware = null;
        let tail: Middleware = null;

        for (let i = 0; i < middleware.length; i++) {
            if (i === 0) {
                head = middleware[i];
                tail = middleware[i];
            } else {
                tail.setNext(middleware[i]);
                tail = middleware[i];
            }
        }

        tail.setNext(command);

        return head;
    }
}
