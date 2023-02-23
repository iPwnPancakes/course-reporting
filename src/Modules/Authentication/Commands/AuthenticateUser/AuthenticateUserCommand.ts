import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';

export class AuthenticateUserCommand implements CommandHandler {
    public readonly key = 'AuthenticateUserCommand';
    handle(request: AuthenticateUserRequest): string {
        return request.name;
    }
}
