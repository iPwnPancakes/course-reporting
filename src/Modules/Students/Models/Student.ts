import { Result } from '../../../Shared/Application/Result/Result';
import { ValidationError } from '../../../Shared/Application/Errors/ValidationError';
import { StudentEmail } from './StudentEmail';
import { Name } from './Name';

export class Student {
    private constructor(private readonly name: string, private email: StudentEmail) {
    }

    static make(name: string, email: string): Result<Student, ValidationError> {
        const nameOrError = Name.make(name);
        if (nameOrError.ok === false) {
            return nameOrError;
        }

        const studentEmailOrError = StudentEmail.make(email);
        if (studentEmailOrError.ok === false) {
            return studentEmailOrError;
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
