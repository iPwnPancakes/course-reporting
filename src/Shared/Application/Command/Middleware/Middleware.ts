import { CommandRequest } from '../CommandRequest';
import { Result } from '../../Result/Result';
import { ViewBag } from '../../ViewBag/ViewBag';
import { CommandHandler } from '../CommandHandler';

export interface Middleware {
    next: Middleware | CommandHandler;

    handle(request: CommandRequest): Promise<Result<ViewBag>>;

    setNext(middleware: Middleware | CommandHandler): void;
}
