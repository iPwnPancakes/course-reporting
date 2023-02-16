import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { Student } from '../../Models/Student';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';
import { Result } from "../../../../Shared/Application/Result/Result";

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, Result<Student, Error>> {
    constructor(private readonly studentRepo: IStudentRepository) {
    }

    handle(request: RegisterStudentRequest): Result<Student, Error> {
        const studentOrError = Student.make(request.name, request.email);
        if (studentOrError.ok === false) {
            return { ok: false, error: studentOrError.error };
        }

        return { ok: true, value: this.studentRepo.addStudent(studentOrError.value) };
    }
}
