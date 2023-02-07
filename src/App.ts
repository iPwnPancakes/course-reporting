import { RegisterStudentRequest } from './Modules/Students/Commands/RegisterStudent/RegisterStudentRequest';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';

export class App {

    private readonly currentUserRepo: InMemoryCurrentUserRepository;

    constructor(private readonly compositionRoot: CompositionRoot) {
        this.currentUserRepo = compositionRoot.makeCurrentUserRepository();
    }

    public start() {
        console.log('hello world');
    }

    public createStudent(name: string) {
        const request: RegisterStudentRequest = { name };
        const handler = this.compositionRoot.makeRegisterStudentCommand();

        return handler.handle(request);
    }

    login(username: string) {
        this.currentUserRepo.setCurrentUser(username);
    }

    listAllStudents(): string[] {
        return ['Greg', 'Daniel'];
    }

    logout() {

    }

    whoAmI(): string | null {
        return this.currentUserRepo.getCurrentUser();
    }

    createTeacher(username: string) {

    }
}
