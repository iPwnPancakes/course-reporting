import { RegisterStudentRequest } from './Modules/Students/Commands/RegisterStudent/RegisterStudentRequest';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { IStudentRepository } from './Modules/Students/Repositories/StudentRepository/IStudentRepository';
import { Student } from './Modules/Students/Models/Student';
import { DataSource } from 'typeorm';

export class App {

    private readonly currentUserRepo: InMemoryCurrentUserRepository;
    private readonly userRepo: IStudentRepository;
    private readonly dbConnection: DataSource;

    constructor(private readonly compositionRoot: CompositionRoot) {
        this.currentUserRepo = compositionRoot.makeCurrentUserRepository();
        this.userRepo = compositionRoot.makeStudentRepository();
        this.dbConnection = compositionRoot.getTypeOrmDataSource();
    }

    public async start() {
        await this.dbConnection.initialize();
    }

    public createStudent(name: string, email: string) {
        const request: RegisterStudentRequest = { name, email };
        const handler = this.compositionRoot.makeRegisterStudentCommand();

        return handler.handle(request);
    }

    login(username: string) {
        this.currentUserRepo.setCurrentUser(username);
    }

    async listAllStudents(): Promise<string[]> {
        let allStudents = await this.userRepo.getAllStudents();
        return allStudents.map((s: Student) => s.getName());
    }

    logout() {

    }

    whoAmI(): string | null {
        return this.currentUserRepo.getCurrentUser();
    }

    createTeacher(username: string) {

    }
}
