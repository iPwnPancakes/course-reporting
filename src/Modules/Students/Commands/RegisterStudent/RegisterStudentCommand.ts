import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, boolean> {
    constructor(private readonly studentRepo: IStudentRepository) {
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

        this.studentRepo.addStudent(request.name);
        return true;
    }
}
