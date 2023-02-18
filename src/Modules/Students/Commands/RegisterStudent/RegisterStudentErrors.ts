import { ApplicationError } from '../../../../Shared/Application/Errors/ApplicationError';

export class InvalidOperationError extends ApplicationError {
    constructor(public readonly message: string, public readonly stack?: string) {
        super(message, 'InvalidOperationError', stack);
    }
}
