import { CommandRequest } from '../../../../Shared/Application/Command/CommandRequest';

export interface RegisterStudentRequest extends CommandRequest {
    name: string;
    email: string;
}
