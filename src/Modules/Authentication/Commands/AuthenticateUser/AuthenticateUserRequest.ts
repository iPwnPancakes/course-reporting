import { CommandRequest } from '../../../../Shared/Application/Command/CommandRequest';

export class AuthenticateUserRequest implements CommandRequest {
    public readonly key = 'AuthenticateUserCommand';

    constructor(public readonly name: string) {}
}
