import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AuthenticateUserCommand } from './AuthenticateUserCommand';
import { AuthenticateUserRequest } from "./AuthenticateUserRequest";
import { Result } from '../../../../Shared/Application/Result/Result';

const useCase = new AuthenticateUserCommand();
let response: Result<string> | null = null;

Given('I have not authenticated myself yet', function () {
});

Given(/a Teacher by the name of (.*) exists/, function (name: string) {
});

When(/^I go to authenticate myself as (.*)$/, async function (name: string) {
    response = await useCase.handle(new AuthenticateUserRequest(name));
});

Then(/I should be authenticated as (.*)/, function (name: string) {
    if(response.ok === false) {
        expect.fail('Did not expect response to fail');
    }

    expect(response.value).to.equal(name);
});
