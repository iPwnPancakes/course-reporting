import { CreateStudentRequest } from './CreateStudentRequest';
import { Handler } from '../../../../Shared/Application/Command/Handler';
import { ViewModel } from '../../../../Shared/Application/ViewModel/ViewModel';
import { EmptyViewModel } from '../../../../Shared/Application/ViewModel/EmptyViewModel';

export class CreateStudentHandler implements Handler {
    handle(request: CreateStudentRequest): ViewModel {
        console.log('was called');
        return new EmptyViewModel();
    }
}
