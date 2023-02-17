import { Given, Then, When } from '@cucumber/cucumber';
import { RegisterStudentCommand } from '../RegisterStudentCommand';
import { expect } from 'chai';
import { InMemoryStudentRepository } from '../../../Repositories/StudentRepository/InMemoryStudentRepository/InMemoryStudentRepository';
import { Student } from "../../../Models/Student";
import { Result } from "../../../../../Shared/Application/Result/Result";
import { IEmailService } from "../../../../Email/Contracts/IEmailService";
import { capture, instance, mock, when } from "ts-mockito";

let mockEmailService: IEmailService;
let useCase: RegisterStudentCommand;
let response: Result<Student, Error>;

Given('the RegisterStudent handler', function () {
    const userRepo = new InMemoryStudentRepository();
    mockEmailService = mock<IEmailService>();
    useCase = new RegisterStudentCommand(userRepo, instance(mockEmailService));
});

When(/I register a Student named (.*) with email (.*)/, async function (name: string, email: string) {
    response = await useCase.handle({ name, email });
});

Then(/I should get back a Student named (.*) with email (.*)/, function (name: string, email: string) {
    if (response.ok) {
        expect(response.ok).to.equal(true);
        expect(response.value.getName()).to.equal(name);
        expect(response.value.getEmail()).to.equal(email);
    } else {
        expect.fail('Expected a successful result but got an error');
    }
});

Then(/I should get back an error/, function () {
    if (response.ok === false) {
        expect(response.ok).to.equal(false);
        expect(response.error).to.not.be.null;
    } else {
        expect.fail('Expected a failure result but got a successful one');
    }
});

Given(/^a Student with name (.*) and email (.*) is already registered$/, function (name: string, email: string) {
    useCase.handle({ name, email });
});
Then(/^an email should be sent to (.*) that (.*) has been registered$/, function (email: string, name: string) {
    const [studentName, subjects] = capture(mockEmailService.sendNewStudentRegistrationEmail).last();

    expect(studentName).to.equal(name);
    expect(subjects).to.include(email);
});
Given(/^an Email Service is not available$/, function () {
    when(mockEmailService.sendNewStudentRegistrationEmail).thenThrow(new Error('fatal error'));
});
