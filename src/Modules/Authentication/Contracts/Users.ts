export interface Users {
    doesUserExist(name: string): boolean;

    registerUser(name: string): boolean;
}
