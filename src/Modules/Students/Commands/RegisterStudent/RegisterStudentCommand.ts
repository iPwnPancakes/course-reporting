import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { IStudentNameRepository } from '../../Repositories/StudentRepository/IStudentNameRepository';
import { Student } from '../../Models/Student';

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, boolean> {
    constructor(private readonly studentRepo: IStudentNameRepository) {
    }

    handle(request: RegisterStudentRequest): boolean {
        const studentOrError = Student.make(request.name, request.email);
        if (!studentOrError.ok) {
            return false;
        }

        this.studentRepo.addStudent(studentOrError.value.getName());
        return true;
    }
}
