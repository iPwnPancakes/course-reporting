import { CommandRequest } from '../CommandRequest';

export interface Middleware {
    handle(request: CommandRequest, next?: Middleware): boolean;
}
