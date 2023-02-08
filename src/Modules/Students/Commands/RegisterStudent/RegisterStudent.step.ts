import { Given, Then, When } from '@cucumber/cucumber';
import { RegisterStudentCommand } from './RegisterStudentCommand';
import { expect } from 'chai';
import { InMemoryStudentRepository } from '../../Repositories/StudentRepository/InMemoryStudentRepository';

const userRepo = new InMemoryStudentRepository();
const useCase = new RegisterStudentCommand(userRepo);

let response: boolean = false;

Given('I am a Teacher', function () {
});

When(/I go to register a new Student named (.*) with email (.*)/, function (name: string, email: string) {
    response = useCase.handle({ name, email });
});

Then(/I should see (.*) in the Student List/, function (name: string) {
    expect(response).to.equal(true);
});

Then(/I should NOT see (.*) in the Student List/, function (name: string) {
    expect(response).to.equal(false);
});

