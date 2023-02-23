import { CommandRequest } from "./CommandRequest";

export interface CommandHandler<T> {
    readonly key: string;

    handle(request: CommandRequest): T;
}
