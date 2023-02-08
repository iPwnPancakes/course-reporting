import { Result } from '../../../Shared/Application/Result/Result';
import { ValidationError } from '../../../Shared/Application/Errors/ValidationError';

export class StudentEmail {
    constructor(private email: string) {
    }

    public static make(email: string): Result<StudentEmail, ValidationError> {
        return { ok: true, value: new StudentEmail(email) };
    }

    public toString() {
        return this.email;
    }
}
