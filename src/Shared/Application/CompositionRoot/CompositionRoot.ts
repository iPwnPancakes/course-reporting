import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { IStudentRepository } from '../../../Modules/Students/Repositories/StudentRepository/IStudentRepository';
import {
    InMemoryStudentRepository
} from '../../../Modules/Students/Repositories/StudentRepository/InMemoryStudentRepository/InMemoryStudentRepository';
import { IEmailService } from '../../../Modules/Email/Contracts/IEmailService';
import { StubbedEmailService } from '../../../Modules/Email/Services/StubbedEmailService';
import { DataSource } from 'typeorm';
import { makeDataSource } from '../../../Infrastructure/TypeOrm/AppDataSource';
import { AppConfiguration } from '../Configuration/AppConfiguration';

export class CompositionRoot {
    private userRepo: IStudentRepository | null = null;
    private appDataSource: DataSource | null = null;

    public makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    public makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeStudentRepository(), this.makeEmailService());
    }

    public makeStudentRepository(): IStudentRepository {
        if (!this.userRepo) {
            this.userRepo = new InMemoryStudentRepository();
        }

        return this.userRepo;
    }

    public getTypeOrmDataSource(): DataSource {
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
