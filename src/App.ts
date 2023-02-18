import { RegisterStudentRequest } from './Modules/Students/Commands/RegisterStudent/RegisterStudentRequest';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { IStudentRepository } from './Modules/Students/Repositories/StudentRepository/IStudentRepository';
import { Student } from './Modules/Students/Models/Student';
import { IDatabaseConnection } from './Infrastructure/DatabaseConnection/IDatabaseConnection';
import { IHttpServer } from './Infrastructure/Http/IHttpServer';

export class App {

    private readonly currentUserRepo: InMemoryCurrentUserRepository;
    private readonly userRepo: IStudentRepository;
    private readonly dbConnection: IDatabaseConnection;
    private readonly httpServer: IHttpServer;

    constructor(private readonly compositionRoot: CompositionRoot) {
        this.currentUserRepo = compositionRoot.makeCurrentUserRepository();
        this.userRepo = compositionRoot.makeStudentRepository();
        this.dbConnection = compositionRoot.makeDatabaseConnection();
        this.httpServer = compositionRoot.makeHttpServer();
    }

    public async start() {
        await this.dbConnection.connect();
        await this.httpServer.start();
    }

    public async createStudent(name: string, email: string) {
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
