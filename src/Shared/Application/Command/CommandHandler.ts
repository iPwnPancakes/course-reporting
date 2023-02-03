import { CommandRequest } from './CommandRequest';
import { CommandResponse } from './CommandResponse';

export interface CommandHandler {
    handle(request: CommandRequest): CommandResponse;
}
