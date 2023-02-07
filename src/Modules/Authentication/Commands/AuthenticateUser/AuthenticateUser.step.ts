import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AuthenticateUserCommand } from './AuthenticateUserCommand';
import { InMemoryUserRepository } from '../../../Students/Repositories/UserRepository/InMemoryUserRepository';

const userRepo = new InMemoryUserRepository();
const useCase = new AuthenticateUserCommand(userRepo);
let response: string | null = null;

Given('I have not authenticated myself yet', function () {
});

Given(/a Teacher by the name of (.*) exists/, function (name: string) {
    userRepo.addUser(name);
});

When(/^I go to authenticate myself as (.*)$/, function (name: string) {
    response = useCase.handle({ name });
});

Then(/I should be authenticated as (.*)/, function (name: string) {
    expect(response).to.equal(name);
});
