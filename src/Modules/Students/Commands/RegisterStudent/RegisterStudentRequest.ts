import { CommandRequest } from '../../../../Shared/Application/Command/CommandRequest';

export class RegisterStudentRequest implements CommandRequest {
    public readonly key: string = 'RegisterStudentCommand';

    constructor(public readonly name: string, public readonly email: string) {}
}
