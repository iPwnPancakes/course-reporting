import { CommandMap } from "./CommandMap";
import { CommandRequest } from "./CommandRequest";

export class CommandMediator {
    constructor(private readonly commandMap: CommandMap) {}

    route(request: CommandRequest) {
        const command = this.commandMap[request.key];
        return command.handle(request);
    }
}