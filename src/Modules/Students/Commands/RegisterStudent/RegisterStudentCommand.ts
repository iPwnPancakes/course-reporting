import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { Student } from '../../Models/Student';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, boolean> {
    constructor(private readonly studentRepo: IStudentRepository) {
    }

    handle(request: RegisterStudentRequest): boolean {
        const studentOrError = Student.make(request.name, request.email);
        if (!studentOrError.ok) {
            return false;
        }

        this.studentRepo.addStudent(studentOrError.value);
        return true;
    }
}
