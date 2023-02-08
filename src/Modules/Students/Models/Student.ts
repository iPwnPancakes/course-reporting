export class Student {
    constructor(private readonly name: string, private email: string) {
    }

    static make(name: string, email: string): Student {
        return new Student(name, email);
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
