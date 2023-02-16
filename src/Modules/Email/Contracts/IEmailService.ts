export interface IEmailService {
    sendNewStudentRegistrationEmail(studentName: string, emails: string[]);
}