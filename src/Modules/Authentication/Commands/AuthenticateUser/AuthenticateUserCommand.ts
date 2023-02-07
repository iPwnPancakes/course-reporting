import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';
import { InMemoryStudentRepository } from '../../../Students/Repositories/StudentRepository/InMemoryStudentRepository';

export class AuthenticateUserCommand implements CommandHandler<AuthenticateUserRequest, string> {
    constructor(private readonly userRepo: InMemoryStudentRepository) {
    }

    handle(request: AuthenticateUserRequest): string {
        return request.name;
    }
}
