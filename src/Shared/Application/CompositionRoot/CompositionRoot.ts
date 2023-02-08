import {
    InMemoryCurrentUserRepository
} from '../../../Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { RegisterStudentCommand } from '../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { IStudentNameRepository } from '../../../Modules/Students/Repositories/StudentRepository/IStudentNameRepository';
import {
    InMemoryStudentNameRepository
} from '../../../Modules/Students/Repositories/StudentRepository/InMemoryStudentNameRepository';

export class CompositionRoot {
    private userRepo: IStudentNameRepository | null = null;

    public makeCurrentUserRepository(): InMemoryCurrentUserRepository {
        return new InMemoryCurrentUserRepository();
    }

    public makeRegisterStudentCommand() {
        return new RegisterStudentCommand(this.makeUserRepository());
    }

    public makeUserRepository(): IStudentNameRepository {
        if (!this.userRepo) {
            this.userRepo = new InMemoryStudentNameRepository();
        }

        return this.userRepo;
    }
}
