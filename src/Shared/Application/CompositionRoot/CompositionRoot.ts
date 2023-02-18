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

export class CompositionRoot {
    private userRepo: IStudentRepository | null = null;
    private appDataSource: DataSource | null = null;
    private databaseConnection: IDatabaseConnection | null;
    private httpServer: IHttpServer | null;

    constructor(private readonly config: AppConfiguration) {
    }

    public makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    public makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeStudentRepository(), this.makeEmailService());
    }

    public makeStudentRepository(): IStudentRepository {
        if (!this.userRepo) {
            this.userRepo = this.config.isProduction() ?
                new TypeOrmStudentRepository(this.getTypeOrmDataSource()) :
                new InMemoryStudentRepository();
        }

        return this.userRepo;
    }

    public makeDatabaseConnection(): IDatabaseConnection {
        if (!this.databaseConnection) {
            if (this.config.isProduction()) {
                this.databaseConnection = new TypeOrmDatabaseConnection(this.getTypeOrmDataSource());
            } else {
                this.databaseConnection = new StubbedDatabaseConnection();
            }
        }

        return this.databaseConnection;
    }

    public makeHttpServer(): IHttpServer {
        if (!this.httpServer) {
            this.httpServer = new StubbedHttpServer();
        }

        return this.httpServer;
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
