import { CreateStudentCommand } from './Modules/Students/Commands/CreateStudent/CreateStudentCommand';
import { CreateStudentRequest } from './Modules/Students/Commands/CreateStudent/CreateStudentRequest';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';

export class App {
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
        this.currentUserRepo.setCurrentUser(username);
    }

    listAllStudents(): string[] {
        return ['Greg'];
    }

    logout() {

    }

    whoAmI(): string | null {
        return this.currentUserRepo.getCurrentUser();
    }

    createTeacher(username: string) {

    }
}
