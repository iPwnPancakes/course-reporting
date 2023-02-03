import { CreateStudentCommand } from './Modules/Students/Commands/CreateStudent/CreateStudentCommand';
import { CreateStudentRequest } from './Modules/Students/Commands/CreateStudent/CreateStudentRequest';

export class App {
    public start() {
        console.log('hello world');
    }

    public createStudent(name: string) {
        const request: CreateStudentRequest = { name };
        const handler = new CreateStudentCommand();

        return handler.handle(request);
    }

    login() {

    }

    listAllStudents(): string[] {
        return ["Greg"];
    }
}
