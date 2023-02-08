export class Student {
    constructor(private readonly name: string, private email: string) {
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    equals(student: Student) {
        return student.getName() === this.name && student.getEmail() === this.email;
    }
}
