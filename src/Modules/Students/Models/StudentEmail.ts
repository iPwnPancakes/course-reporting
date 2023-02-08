import { Result } from '../../../Shared/Application/Result/Result';
import { ValidationError } from '../../../Shared/Application/Errors/ValidationError';

export class StudentEmail {
    private constructor(private email: string) {
    }

    public static make(email: string): Result<StudentEmail, ValidationError> {
        const validEmailRegex = /^\S+@\S+$/;
        if (!validEmailRegex.test(email)) {
            return { ok: false, error: new ValidationError('Email requires an "@" character') };
        }

        return { ok: true, value: new StudentEmail(email) };
    }

    public toString() {
        return this.email;
    }
}
