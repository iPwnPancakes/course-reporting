import { ApplicationError } from './ApplicationError';

export class ValidationError extends ApplicationError {
    constructor(public readonly message: string, public readonly stack?: string) {
        super(message, 'ValidationError', stack);
    }
}
