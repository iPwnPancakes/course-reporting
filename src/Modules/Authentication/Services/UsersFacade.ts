import { Users } from '../Contracts/Users';
import { InMemoryUserRepository } from '../Repositories/InMemoryUserRepository';

export class UsersFacade implements Users {
    constructor(private readonly userRepo: InMemoryUserRepository) {
    }

    doesUserExist(name: string): boolean {
        const user = this.userRepo.getIfExists(name);

        return user !== null;
    }

    registerUser(name: string): boolean {
        try {
            this.userRepo.addUser(name);

            return true;
        } catch (e) {
            return false;
        }
    }

}
