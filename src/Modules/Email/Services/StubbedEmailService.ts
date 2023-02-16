import { IEmailService } from "../Contracts/IEmailService";

export class StubbedEmailService implements IEmailService {
    sendNewStudentRegistrationEmail(studentName: string, emails: string[]) {
    }
}