import { Result } from '../../../Shared/Application/Result/Result';
import { ValidationError } from '../../../Shared/Application/Errors/ValidationError';
import { StudentEmail } from './StudentEmail';

export class Student {
    private constructor(private readonly name: string, private email: StudentEmail) {
    }

    static make(name: string, email: string): Result<Student, ValidationError> {
        const validNameRegex = /^[a-zA-Z]+$/;
        if (!validNameRegex.test(name)) {
            return { ok: false, error: new ValidationError('Name contained invalid characters') };
        }

        const studentEmailOrError = StudentEmail.make(email);
        if (!studentEmailOrError.ok) {
            return studentEmailOrError as { ok: false, error: ValidationError };
        }

        return { ok: true, value: new Student(name, studentEmailOrError.value) };
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email.toString();
    }

    equals(student: Student) {
        return student.getName() === this.getName() && student.getEmail() === this.getEmail();
    }
}
