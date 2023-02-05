import { Given, Then, When } from '@cucumber/cucumber';
import { App } from '../../../src/App';
import { expect } from 'chai';

Given('I have not authenticated myself yet', function () {
    const app: App = this.app;

    app.logout();
});

Given(/a Teacher by the name of (.*) exists/, function (username: string) {
    const app: App = this.app;

    app.createTeacher(username);
});

When(/^I go to authenticate myself as (.*)$/, function (username: string) {
    const app: App = this.app;

    app.login(username);
});

Then(/I should be authenticated as (.*)/, function (username: string) {
    const app: App = this.app;

    const loggedInAs: string = app.whoAmI();

    expect(loggedInAs).to.equal(username);
});
