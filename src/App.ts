import { CreateStudentCommand } from './Modules/Students/Commands/CreateStudent/CreateStudentCommand';
import { CreateStudentRequest } from './Modules/Students/Commands/CreateStudent/CreateStudentRequest';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';

export class App {
    private currentUser: string | null = null;

    constructor(private readonly currentUserRepo: InMemoryCurrentUserRepository) {
    }

    public start() {
        console.log('hello world');
    }

    public createStudent(name: string) {
        const request: CreateStudentRequest = { name };
        const handler = new CreateStudentCommand();

        return handler.handle(request);
    }

    login(username: string) {
        this.currentUser = username;
    }

    listAllStudents(): string[] {
        return ['Greg'];
    }

    logout() {

    }

    whoAmI(): string | null {
        return this.currentUser;
    }

    createTeacher(username: string) {

    }
}
