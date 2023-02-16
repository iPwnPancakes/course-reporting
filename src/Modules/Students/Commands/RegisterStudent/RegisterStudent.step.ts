import { Given, Then, When } from '@cucumber/cucumber';
import { RegisterStudentCommand } from './RegisterStudentCommand';
import { expect } from 'chai';
import { InMemoryStudentRepository } from '../../Repositories/StudentRepository/InMemoryStudentRepository';
import { Student } from "../../Models/Student";
import { Result } from "../../../../Shared/Application/Result/Result";
import { EmailServiceSpy } from "../../../../../tests/UseCase/Fixtures/EmailServiceSpy";

let mockEmailService: EmailServiceSpy;
let useCase: RegisterStudentCommand;
let response: Result<Student, Error>;

Given('the RegisterStudent handler', function () {
    const userRepo = new InMemoryStudentRepository();
    mockEmailService = new EmailServiceSpy();
    useCase = new RegisterStudentCommand(userRepo, mockEmailService);
});

When(/I register a Student named (.*) with email (.*)/, function (name: string, email: string) {
    response = useCase.handle({ name, email });
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
Then(/^an email should be sent$/, function () {
    expect(mockEmailService.newStudentRegistrationEmailCalls).to.equal(1);
});