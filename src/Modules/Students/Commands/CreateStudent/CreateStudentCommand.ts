import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { CreateStudentRequest } from './CreateStudentRequest';
import { Users } from '../../../Authentication/Contracts/Users';

export class CreateStudentCommand implements CommandHandler<CreateStudentRequest, boolean> {
    constructor(private readonly userService: Users) {
    }

    handle(request: CreateStudentRequest): boolean {
        const validNameRegex = /^[a-zA-Z]+$/;
        if (!validNameRegex.test(request.name)) {
            return false;
        }

        return this.userService.registerUser(request.name);
    }
}
