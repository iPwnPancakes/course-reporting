import { IEmailService } from "../../../src/Modules/Email/Contracts/IEmailService";

export class EmailServiceSpy implements IEmailService {
    public newStudentRegistrationEmailCalls = 0;

    sendNewStudentRegistrationEmail(studentName: string, emails: string[]) {
        this.newStudentRegistrationEmailCalls++;
    }
}