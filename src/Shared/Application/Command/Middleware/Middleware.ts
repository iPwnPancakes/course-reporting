import { CommandRequest } from '../CommandRequest';
import { Result } from '../../Result/Result';
import { ViewBag } from '../../ViewBag/ViewBag';

export interface Middleware {
    next: Middleware;

    handle(request: CommandRequest): Promise<Result<ViewBag>>;

    setNext(middleware: Middleware): void;
}
