import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';
import { Result } from '../../../../Shared/Application/Result/Result';

export class AuthenticateUserCommand implements CommandHandler<string> {
    public static readonly key = 'AuthenticateUserCommand';

    async handle(request: AuthenticateUserRequest): Promise<Result<string>> {
        return { ok: true, value: request.name };
    }
}
