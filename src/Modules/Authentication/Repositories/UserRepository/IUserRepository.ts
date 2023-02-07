export interface IUserRepository {
    getIfExists(name: string): string | null;

    addUser(name: string): void;

    getNumberOfUsers(): Number;

    getAllUsers(): string[];
}
