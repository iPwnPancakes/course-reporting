import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { IStudentNameRepository } from '../../Repositories/StudentRepository/IStudentNameRepository';
import { Student } from '../../Models/Student';

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, boolean> {
    constructor(private readonly studentRepo: IStudentNameRepository) {
    }

    handle(request: RegisterStudentRequest): boolean {
        const validNameRegex = /^[a-zA-Z]+$/;
        if (!validNameRegex.test(request.name)) {
            return false;
        }

        const validEmailRegex = /^\S+@\S+$/;
        if (!validEmailRegex.test(request.email)) {
            return false;
        }

        const student = Student.make(request.name, request.email);

        this.studentRepo.addStudent(student.getName());
        return true;
    }
}
