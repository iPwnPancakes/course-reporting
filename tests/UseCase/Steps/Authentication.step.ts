import { Given, Then, When } from '@cucumber/cucumber';
import { App } from '../../../src/App';
import { expect } from 'chai';

Given('I have not authenticated myself', function () {
    const app: App = this.app;

    app.logout();
});

Given('{string} is registered within the system with the password {string}', function (username: string, password: string) {
    const app: App = this.app;

    app.logout();
});

When('I go to authenticate myself as {string} with password {string}', function (username: string, password: string) {
    const app: App = this.app;

    app.login(username, password);
});

Then('I should be authenticated as {string}', function (username: string) {
    const app: App = this.app;

    const loggedInAs: string = app.whoAmI();

    expect(loggedInAs).to.equal(username);
});
