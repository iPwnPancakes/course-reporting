import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { RegisterStudentRequest } from './RegisterStudentRequest';
import { Student } from '../../Models/Student';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';
import { Result } from '../../../../Shared/Application/Result/Result';
import { InvalidOperationError } from './RegisterStudentErrors';
import { IEmailService } from '../../../Email/Contracts/IEmailService';
import { ViewBag } from '../../../../Shared/Application/ViewBag/ViewBag';

export class RegisterStudentCommand implements CommandHandler {
    public static readonly key = 'RegisterStudentCommand';

    constructor(private readonly studentRepo: IStudentRepository, private readonly emailService: IEmailService) {
    }

    async handle(request: RegisterStudentRequest): Promise<Result<ViewBag>> {
        const studentOrError = Student.make(request.name, request.email);
        if (studentOrError.ok === false) {
            return { ok: false, error: studentOrError.error };
        }

        if (await this.studentRepo.contains(studentOrError.value)) {
            return { ok: false, error: new InvalidOperationError('Student already exists') };
        }

        const registeredStudent = await this.studentRepo.addStudent(studentOrError.value);

        try {
            this.emailService.sendNewStudentRegistrationEmail(registeredStudent.getName(), [registeredStudent.getEmail()]);
        } catch (e) {
            return { ok: false, error: new Error('Email Service is not available') };
        }


        return { ok: true, value: new ViewBag({ student: registeredStudent }) };
    }
}
