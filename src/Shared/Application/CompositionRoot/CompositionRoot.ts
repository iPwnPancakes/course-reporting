import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { UsersFacade } from '../../../Modules/Authentication/Services/UsersFacade';
import { Users } from '../../../Modules/Authentication/Contracts/Users';
import { IUserRepository } from '../../../Modules/Authentication/Repositories/UserRepository/IUserRepository';
import {
    InMemoryUserRepository
} from '../../../Modules/Authentication/Repositories/UserRepository/InMemoryUserRepository';

export class CompositionRoot {
    public makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    public makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeUserService());
    }

    private makeUserService(): Users {
        return new UsersFacade(this.makeUserRepository());
    }

    private makeUserRepository(): IUserRepository {
        return new InMemoryUserRepository();
    }
}
