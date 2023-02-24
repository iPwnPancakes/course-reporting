import { CommandMap } from "./CommandMap";
import { CommandRequest } from "./CommandRequest";
import { CommandHandler } from "./CommandHandler";

export class CommandMediator {
    constructor(private readonly commandMap: CommandMap) {}

    route<T>(request: CommandRequest): T {
        const commandFactory = this.commandMap[request.key];
        const command: CommandHandler<T> = commandFactory();

        return command.handle(request);
    }
}