import { CommandRequest } from './CommandRequest';
import { Result } from '../Result/Result';

export interface CommandHandler<T> {
    handle(request: CommandRequest): Promise<Result<T>>;
}
