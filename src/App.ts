import { RegisterStudentRequest } from './Modules/Students/Commands/RegisterStudent/RegisterStudentRequest';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { IStudentNameRepository } from './Modules/Students/Repositories/StudentRepository/IStudentNameRepository';

export class App {

    private readonly currentUserRepo: InMemoryCurrentUserRepository;
    private readonly userRepo: IStudentNameRepository;

    constructor(private readonly compositionRoot: CompositionRoot) {
        this.currentUserRepo = compositionRoot.makeCurrentUserRepository();
        this.userRepo = compositionRoot.makeUserRepository();
    }

    public start() {
        console.log('hello world');
    }

    public createStudent(name: string, email: string) {
        const request: RegisterStudentRequest = { name, email };
        const handler = this.compositionRoot.makeRegisterStudentCommand();

        return handler.handle(request);
    }

    login(username: string) {
        this.currentUserRepo.setCurrentUser(username);
    }

    listAllStudents(): string[] {
        return this.userRepo.getAllStudents();
    }

    logout() {

    }

    whoAmI(): string | null {
        return this.currentUserRepo.getCurrentUser();
    }

    createTeacher(username: string) {

    }
}
