import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { CreateStudentCommand } from '../../../Modules/Students/Commands/CreateStudent/CreateStudentCommand';
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

    makeCreateStudentCommand() {
        return new CreateStudentCommand(this.makeUserService());
    }

    private makeUserService(): Users {
        return new UsersFacade(this.makeUserRepository());
    }

    private makeUserRepository(): IUserRepository {
        return new InMemoryUserRepository();
    }
}
