import { CommandMap } from './CommandMap';
import { CommandRequest } from './CommandRequest';
import { CommandHandler } from './CommandHandler';
import { Middleware } from './Middleware/Middleware';
import { Result } from '../Result/Result';

export class CommandMediator {
    constructor(private readonly commandMap: CommandMap) {}

    async route<T>(request: CommandRequest): Promise<Result<T>> {
        const commandEntry = this.commandMap[request.key];

        if (commandEntry.middleware) {
            const middlewareChain = this.chainMiddleware(commandEntry.middleware);

            const response = await middlewareChain.handle<T>(request);
            if (response.ok === false) {
                return response;
            }
        }

        const commandFactory = this.commandMap[request.key].handler;
        const command: CommandHandler<T> = commandFactory();

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
