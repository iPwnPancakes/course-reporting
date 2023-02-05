import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { CreateStudentRequest } from './CreateStudentRequest';

export class CreateStudentCommand implements CommandHandler<boolean> {
    handle(request: CreateStudentRequest): boolean {
        return true;
    }
}
