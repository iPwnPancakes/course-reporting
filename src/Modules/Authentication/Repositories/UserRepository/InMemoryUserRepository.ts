import { IUserRepository } from './IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
    constructor(private arr: string[] = []) {
    }

    getIfExists(name: string): string | null {
        const index = this.arr.indexOf(name);

        if (index === -1) {
            return null;
        }

        return this.arr[index];
    }

    addUser(name: string): void {
        const index = this.arr.indexOf(name);

        if (index === -1) {
            this.arr.push(name);
        }
    }

    getNumberOfUsers(): Number {
        return this.arr.length;
    }
}
