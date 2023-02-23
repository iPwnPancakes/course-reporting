import { CommandMap } from "./CommandMap";
import { CommandRequest } from "./CommandRequest";

export class CommandMediator {
    constructor(private readonly commandMap: CommandMap) {}

    route<T>(request: CommandRequest): T {
        const command = this.commandMap[request.key];
        return command.handle(request);
    }
}