import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { App } from '../../../src/App';

Given('I am a Teacher', function () {
    const app: App = this.app;
    app.login('', '');
});

When('I go to register a new Student named {string}', function (name: string) {
    const app: App = this.app;
    app.createStudent(name);
});

Then('I should see {string} in the Student List', function (name: string) {
    const app: App = this.app;
    const studentList = app.listAllStudents();

    expect(studentList).to.contain(name);
});
