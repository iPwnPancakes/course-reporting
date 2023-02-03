import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { CreateStudentRequest } from './CreateStudentRequest';

export class CreateStudentCommand implements CommandHandler {
    handle(request: CreateStudentRequest): boolean {
        return false;
    }
}
