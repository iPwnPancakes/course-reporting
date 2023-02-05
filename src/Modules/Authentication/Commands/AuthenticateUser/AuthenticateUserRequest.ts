import { CommandRequest } from '../../../../Shared/Application/Command/CommandRequest';

export interface AuthenticateUserRequest extends CommandRequest {
    name: string;
}
