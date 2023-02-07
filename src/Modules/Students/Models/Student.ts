export class Student {
    constructor(private readonly name: string, private email: string) {
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }
}
