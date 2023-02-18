import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { App } from '../../../src/App';
import { RandomValueMap } from '../TestInfrastructure/RandomValueMap';

Given('I am a Teacher', function () {
    const app: App = this.app;
    app.login('');
});

When(/I go to register a new Student named (.*) with email (.*)/, async function (name: string, email: string) {
    const app: App = this.app;
    const map: RandomValueMap = this.map;

    if (/^[a-zA-Z]+$/.test(name)) {
        map.mapKeyToAlphabeticString(name);
    } else {
        map.mapKeyToValue(name, name);
    }

    if (/^.+@.+$/.test(email)) {
        map.mapEmailToRandomEmail(email);
    } else {
        map.mapKeyToValue(email, email);
    }

    await app.createStudent(map.get(name), map.get(email));
});

Then(/I should see (.*) in the Student List/, async function (name: string) {
    const app: App = this.app;
    const studentList = await app.listAllStudents();
    const map: RandomValueMap = this.map;

    expect(studentList).to.contain(map.get(name));
});

Then(/I should NOT see (.*) in the Student List/, async function (name: string) {
    const app: App = this.app;
    const studentList = await app.listAllStudents();
    const map: RandomValueMap = this.map;

    expect(studentList).to.not.contain(map.get(name));
});
