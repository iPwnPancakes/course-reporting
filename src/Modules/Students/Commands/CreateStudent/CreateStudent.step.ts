import { Given, Then, When } from '@cucumber/cucumber';
import { CreateStudentCommand } from './CreateStudentCommand';
import { expect } from 'chai';
import { UsersFacade } from '../../../Authentication/Services/UsersFacade';
import { InMemoryUserRepository } from '../../../Authentication/Repositories/UserRepository/InMemoryUserRepository';

const userRepo = new InMemoryUserRepository();
const fakeUserFacade = new UsersFacade(userRepo);
const useCase = new CreateStudentCommand(fakeUserFacade);

let response: boolean = false;

Given('I am a Teacher', function () {
});

When(/I go to register a new Student named (.*)/, function (name: string) {
    response = useCase.handle({ name });
});

Then(/I should see (.*) in the Student List/, function (name: string) {
    expect(response).to.equal(true);
});

Then(/I should NOT see (.*) in the Student List/, function (name: string) {
    expect(response).to.equal(false);
});

