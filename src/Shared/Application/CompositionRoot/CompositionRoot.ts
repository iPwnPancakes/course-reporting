import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { IStudentRepository } from '../../../Modules/Students/Repositories/StudentRepository/IStudentRepository';
import {
    InMemoryStudentRepository
} from '../../../Modules/Students/Repositories/StudentRepository/InMemoryStudentRepository/InMemoryStudentRepository';
import { IEmailService } from "../../../Modules/Email/Contracts/IEmailService";
import { StubbedEmailService } from "../../../Modules/Email/Services/StubbedEmailService";

export class CompositionRoot {
    private userRepo: IStudentRepository | null = null;

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

    private makeEmailService(): IEmailService {
        return new StubbedEmailService();
    }
}
