import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { App } from '../../../src/App';
import { RandomValueMap } from '../TestInfrastructure/RandomValueMap';
import { TestHttpClient } from '../TestInfrastructure/TestHttpClient';

When(/I go to register a new Student named (.*) with email (.*)/, async function (name: string, email: string) {
    const map: RandomValueMap = this.map;
    const http: TestHttpClient = this.http;

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

    await http.post('/students/addStudent', { name: map.get(name), email: map.get(email) });
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

Then(/I should see (.*) in the registered Students list/, async function (name: string) {
    const http: TestHttpClient = this.http;
    const map: RandomValueMap = this.map;

    const studentList = await http.get('/students');

    expect(studentList).to.contain(map.get(name));
});
