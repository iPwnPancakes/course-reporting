import { IStudentRepository } from './IStudentRepository';

export class InMemoryStudentRepository implements IStudentRepository {
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

    getAllUsers(): string[] {
        return this.arr;
    }
}
