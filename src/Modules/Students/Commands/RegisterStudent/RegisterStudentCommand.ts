import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { Student } from '../../Models/Student';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';
import { Result } from "../../../../Shared/Application/Result/Result";
import { InvalidOperationError } from "./RegisterStudentErrors";
import { IEmailService } from "../../../Email/Contracts/IEmailService";

export class RegisterStudentCommand implements CommandHandler<RegisterStudentRequest, Result<Student, Error>> {
    constructor(private readonly studentRepo: IStudentRepository, private readonly emailService: IEmailService) {
    }

    handle(request: RegisterStudentRequest): Result<Student, Error> {
        const studentOrError = Student.make(request.name, request.email);
        if (studentOrError.ok === false) {
            return { ok: false, error: studentOrError.error };
        }

        if (this.studentRepo.contains(studentOrError.value)) {
            return { ok: false, error: new InvalidOperationError() };
        }

        const registeredStudent = this.studentRepo.addStudent(studentOrError.value);

        this.emailService.sendNewStudentRegistrationEmail(registeredStudent.getName(), [registeredStudent.getEmail()]);

        return { ok: true, value: registeredStudent };
    }
}
