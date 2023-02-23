import { RegisterStudentRequest } from './Modules/Students/Commands/RegisterStudent/RegisterStudentRequest';
import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { IStudentRepository } from './Modules/Students/Repositories/StudentRepository/IStudentRepository';
import { Student } from './Modules/Students/Models/Student';
import { RegisterStudentCommand } from './Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';

export class App {
    constructor(
        private readonly currentUserRepo: InMemoryCurrentUserRepository,
        private readonly studentRepository: IStudentRepository,
        private readonly registerStudentCommand: RegisterStudentCommand
    ) {
    }

    public async createStudent(name: string, email: string) {
        const request = new RegisterStudentRequest(name, email);

        return this.registerStudentCommand.handle(request);
    }

    login(username: string) {
        this.currentUserRepo.setCurrentUser(username);
    }

    async listAllStudents(): Promise<string[]> {
        let allStudents = await this.studentRepository.getAllStudents();
        return allStudents.map((s: Student) => s.getName());
    }

    logout() {

    }

    whoAmI(): string | null {
        return this.currentUserRepo.getCurrentUser();
    }

    createTeacher(username: string) {

    }
}
