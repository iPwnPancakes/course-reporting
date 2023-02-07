import { Given, Then, When } from '@cucumber/cucumber';
import { RegisterStudentCommand } from './RegisterStudentCommand';
import { expect } from 'chai';
import { UsersFacade } from '../../../Authentication/Services/UsersFacade';
import { InMemoryUserRepository } from '../../../Authentication/Repositories/UserRepository/InMemoryUserRepository';

const userRepo = new InMemoryUserRepository();
const fakeUserFacade = new UsersFacade(userRepo);
const useCase = new RegisterStudentCommand(fakeUserFacade);

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

