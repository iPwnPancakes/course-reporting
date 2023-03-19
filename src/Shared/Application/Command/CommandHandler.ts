import { CommandRequest } from './CommandRequest';
import { Result } from '../Result/Result';
import { ViewBag } from '../ViewBag/ViewBag';

export interface CommandHandler {
    handle(request: CommandRequest): Promise<Result<ViewBag>>;
}
