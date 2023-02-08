import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';

export class AuthenticateUserCommand implements CommandHandler<AuthenticateUserRequest, string> {
    handle(request: AuthenticateUserRequest): string {
        return request.name;
    }
}
