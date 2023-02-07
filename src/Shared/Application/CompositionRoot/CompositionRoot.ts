import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { UsersFacade } from '../../../Modules/Authentication/Services/UsersFacade';
import { Users } from '../../../Modules/Authentication/Contracts/Users';
import { IUserRepository } from '../../../Modules/Students/Repositories/UserRepository/IUserRepository';
import {
    InMemoryUserRepository
} from '../../../Modules/Students/Repositories/UserRepository/InMemoryUserRepository';

export class CompositionRoot {
    private userRepo: IUserRepository | null = null;

    public makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    public makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeUserService());
    }

    public makeUserRepository(): IUserRepository {
        if (!this.userRepo) {
            this.userRepo = new InMemoryUserRepository();
        }

        return this.userRepo;
    }

    private makeUserService(): Users {
        return new UsersFacade(this.makeUserRepository());
    }
}
