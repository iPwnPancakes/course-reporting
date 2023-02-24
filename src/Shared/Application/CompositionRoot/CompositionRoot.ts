import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { IStudentRepository } from '../../../Modules/Students/Repositories/StudentRepository/IStudentRepository';
import { IEmailService } from '../../../Modules/Email/Contracts/IEmailService';
import { StubbedEmailService } from '../../../Modules/Email/Services/StubbedEmailService';
import { DataSource } from 'typeorm';
import { makeDataSource } from '../../../Infrastructure/DatabaseConnection/TypeOrm/AppDataSource';
import { AppConfiguration } from '../Configuration/AppConfiguration';
import {
    TypeOrmStudentRepository
} from '../../../Modules/Students/Repositories/StudentRepository/TypeOrmStudentRepository/TypeOrmStudentRepository';
import {
    InMemoryStudentRepository
} from '../../../Modules/Students/Repositories/StudentRepository/InMemoryStudentRepository/InMemoryStudentRepository';
import { IDatabaseConnection } from '../../../Infrastructure/DatabaseConnection/IDatabaseConnection';
import { TypeOrmDatabaseConnection } from '../../../Infrastructure/DatabaseConnection/TypeOrmDatabaseConnection';
import { StubbedDatabaseConnection } from '../../../Infrastructure/DatabaseConnection/StubbedDatabaseConnection';
import { IHttpServer } from '../../../Infrastructure/Http/IHttpServer';
import { StubbedHttpServer } from '../../../Infrastructure/Http/StubbedHttpServer';
import { HapiHttpServer } from '../../../Infrastructure/Http/HapiHttpServer';
import { makeHapiServer } from '../../../Infrastructure/Http/Hapi/makeHapiServer';
import { StudentController } from '../../../Infrastructure/Http/Hapi/Routes/StudentController';
import { App } from '../../../App';
import { CommandMap } from "../Command/CommandMap";
import { CommandMediator } from "../Command/CommandMediator";

export class CompositionRoot {
    private app: App | null = null;
    private userRepo: IStudentRepository | null = null;
    private appDataSource: DataSource | null = null;
    private databaseConnection: IDatabaseConnection | null;
    private httpServer: IHttpServer | null;

    constructor(private readonly config: AppConfiguration) {
    }

    public makeApplication(commandRouter: CommandMediator): App {
        if (!this.app) {
            this.app = new App(
                this.makeCurrentUserRepository(),
                this.makeStudentRepository(),
                this.makeRegisterStudentCommand(),
                commandRouter
            );
        }

        return this.app;
    }

    public makeDatabaseConnection(): IDatabaseConnection {
        if (!this.databaseConnection) {
            this.databaseConnection = this.config.isProduction() ?
                new TypeOrmDatabaseConnection(this.getTypeOrmDataSource()) :
                new StubbedDatabaseConnection();
        }

        return this.databaseConnection;
    }

    public makeHttpServer(app: App): IHttpServer {
        if (!this.httpServer) {
            this.httpServer = this.config.isProduction() ? this.makeHapiHttpServer(app) : new StubbedHttpServer();
        }

        return this.httpServer;
    }

    public makeCommandRouter(commandMap?: CommandMap): CommandMediator {
        if (!this.config.isProduction() && commandMap !== undefined) {
            return new CommandMediator(commandMap);
        }

        return new CommandMediator(this.makeProductionCommandMap());
    }

    private makeProductionCommandMap(): CommandMap {
        return {
            'RegisterStudentCommand': this.makeRegisterStudentCommand.bind(this)
        }
    }

    private makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    private makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeStudentRepository(), this.makeEmailService());
    }

    private makeStudentRepository(): IStudentRepository {
        if (!this.userRepo) {
            this.userRepo = this.config.isProduction() ?
                new TypeOrmStudentRepository(this.getTypeOrmDataSource()) :
                new InMemoryStudentRepository();
        }

        return this.userRepo;
    }

    private makeHapiHttpServer(app: App) {
        let hapiServer = makeHapiServer(this.config.getHttpConfiguration(), [...this.makeStudentController(app).getRoutes()]);
        return new HapiHttpServer(hapiServer);
    }

    private makeStudentController(app: App): StudentController {
        return new StudentController(app);
    }

    private getTypeOrmDataSource(): DataSource {
        if (!this.appDataSource) {
            let databaseConfiguration = this.makeApplicationConfiguration().getDatabaseConfiguration();
            this.appDataSource = makeDataSource(databaseConfiguration);
        }

        return this.appDataSource;
    }

    private makeEmailService(): IEmailService {
        return new StubbedEmailService();
    }

    private makeApplicationConfiguration(): AppConfiguration {
        return new AppConfiguration();
    }
}
