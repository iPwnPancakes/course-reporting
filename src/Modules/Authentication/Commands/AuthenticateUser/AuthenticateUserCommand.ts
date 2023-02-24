import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';

export class AuthenticateUserCommand implements CommandHandler<string> {
    public static readonly key = 'AuthenticateUserCommand';
    handle(request: AuthenticateUserRequest): string {
        return request.name;
    }
}
