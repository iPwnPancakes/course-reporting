import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { UsersFacade } from '../../../Modules/Authentication/Services/UsersFacade';
import { Users } from '../../../Modules/Authentication/Contracts/Users';
import { IStudentRepository } from '../../../Modules/Students/Repositories/StudentRepository/IStudentRepository';
import {
    InMemoryStudentRepository
} from '../../../Modules/Students/Repositories/StudentRepository/InMemoryStudentRepository';

export class CompositionRoot {
    private userRepo: IStudentRepository | null = null;

    public makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    public makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeUserService());
    }

    public makeUserRepository(): IStudentRepository {
        if (!this.userRepo) {
            this.userRepo = new InMemoryStudentRepository();
        }

        return this.userRepo;
    }

    private makeUserService(): Users {
        return new UsersFacade(this.makeUserRepository());
    }
}
