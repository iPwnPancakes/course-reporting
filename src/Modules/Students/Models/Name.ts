import { Result } from '../../../Shared/Application/Result/Result';
import { ValidationError } from '../../../Shared/Application/Errors/ValidationError';

export class Name {
    private constructor(private readonly name: string) {
    }

    public static make(name: string): Result<Name, ValidationError> {
        const validNameRegex = /^[a-zA-Z]+$/;
        if (!validNameRegex.test(name)) {
            return { ok: false, error: new ValidationError('Name contained invalid characters') };
        }

        return { ok: true, value: new Name(name) };
    }
}
