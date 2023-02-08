import { Result } from '../../../Shared/Application/Result/Result';
import { ValidationError } from '../../../Shared/Application/Errors/ValidationError';

export class Student {
    constructor(private readonly name: string, private email: string) {
    }

    static make(name: string, email: string): Result<Student, ValidationError> {
        const validNameRegex = /^[a-zA-Z]+$/;
        if (!validNameRegex.test(name)) {
            return { ok: false, error: new ValidationError('Name contained invalid characters') };
        }

        const validEmailRegex = /^\S+@\S+$/;
        if (!validEmailRegex.test(email)) {
            return { ok: false, error: new ValidationError('Email requires an "@" character') };
        }

        return { ok: true, value: new Student(name, email) };
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    equals(student: Student) {
        return student.getName() === this.name && student.getEmail() === this.email;
    }
}
