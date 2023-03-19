import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { AuthenticateUserRequest } from './AuthenticateUserRequest';
import { ViewBag } from '../../../../Shared/Application/ViewBag/ViewBag';
import { CommandResponse } from '../../../../Shared/Application/Command/CommandResponse';

export class AuthenticateUserCommand implements CommandHandler {
    public static readonly key = 'AuthenticateUserCommand';

    async handle(request: AuthenticateUserRequest): Promise<CommandResponse> {
        return { ok: true, value: new ViewBag({ name: request.name }) };
    }
}
