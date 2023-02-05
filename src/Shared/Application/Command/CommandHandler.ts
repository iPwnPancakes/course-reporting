import { CommandRequest } from './CommandRequest';

export interface CommandHandler<T> {
    handle(request: CommandRequest): T;
}
