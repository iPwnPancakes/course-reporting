import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';
import { InMemoryStudentNameRepository } from '../../../Students/Repositories/StudentRepository/InMemoryStudentNameRepository';

export class AuthenticateUserCommand implements CommandHandler<AuthenticateUserRequest, string> {
    constructor(private readonly userRepo: InMemoryStudentNameRepository) {
    }

    handle(request: AuthenticateUserRequest): string {
        return request.name;
    }
}
