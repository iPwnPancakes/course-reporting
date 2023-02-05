import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';
import { InMemoryUserRepository } from '../../Repositories/UserRepository/InMemoryUserRepository';

export class AuthenticateUserCommand implements CommandHandler<AuthenticateUserRequest, string> {
    constructor(private readonly userRepo: InMemoryUserRepository) {
    }

    handle(request: AuthenticateUserRequest): string {
        return request.name;
    }
}
