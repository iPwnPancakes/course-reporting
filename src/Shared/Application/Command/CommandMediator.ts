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
            for (let i = 0; i < commandEntry.middleware.length; i++) {
                const middleware: Middleware = commandEntry.middleware[i];
                const goToNext = middleware.handle(request);
                if (!goToNext) {
                    return { ok: false, error: new Error('Middleware failed') };
                }
            }
        }

        const commandFactory = this.commandMap[request.key].handler;
        const command: CommandHandler<T> = commandFactory();

        return await command.handle(request);
    }
}
