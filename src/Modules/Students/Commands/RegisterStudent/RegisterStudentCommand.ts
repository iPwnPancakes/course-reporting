import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { Users } from '../../../Authentication/Contracts/Users';

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, boolean> {
    constructor(private readonly userService: Users) {
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

        return this.userService.registerUser(request.name);
    }
}
