import { CommandRequest } from "./CommandRequest";

export interface CommandHandler {
    readonly key: string;

    handle(request: CommandRequest): any;
}
