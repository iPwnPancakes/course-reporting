import { CommandRequest } from '../CommandRequest';
import { Result } from '../../Result/Result';

export interface Middleware {
    next: Middleware;

    handle<T>(request: CommandRequest): Promise<Result<T>>;

    setNext(middleware: Middleware): void;
}
