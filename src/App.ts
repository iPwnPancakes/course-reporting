import { InMemoryCurrentUserRepository } from './Modules/Authentication/Repositories/InMemoryCurrentUserRepository';
import { IStudentRepository } from './Modules/Students/Repositories/StudentRepository/IStudentRepository';
import { Student } from './Modules/Students/Models/Student';
import { CommandMediator } from "./Shared/Application/Command/CommandMediator";
import { CommandRequest } from "./Shared/Application/Command/CommandRequest";
import { Result } from './Shared/Application/Result/Result';

export class App {
    constructor(
        private readonly currentUserRepo: InMemoryCurrentUserRepository,
        private readonly studentRepository: IStudentRepository,
        private readonly commandRouter: CommandMediator
    ) {
    }

    public route<T>(request: CommandRequest): T {
        const routeResponse = this.commandRouter.route<T>(request);

        if(routeResponse.ok) {
            return routeResponse.value;
        } else {
            throw new Error('Could not process request');
        }
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
