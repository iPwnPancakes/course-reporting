import { CommandRequest } from '../../../../Shared/Application/Command/CommandRequest';
import { GetAllRegisteredStudentsHandler } from './GetAllRegisteredStudentsHandler';

export class GetAllRegisteredStudentsRequest implements CommandRequest {
    public readonly key: string = GetAllRegisteredStudentsHandler.key;
}
