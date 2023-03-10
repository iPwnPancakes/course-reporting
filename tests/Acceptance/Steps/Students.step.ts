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

Then(/I should see (.*) in the registered Students list/, async function (name: string) {
    const http: TestHttpClient = this.http;
    const map: RandomValueMap = this.map;

    const response = await http.get('/students');
    if (!response.ok) {
        throw new Error(response.toString());
    }

    const studentList = JSON.parse(response.value);
    const names: string[] = studentList.map(student => student.name);
    expect(names).to.contain(map.get(name));
});

Then(/I should NOT see (.*) in the registered Students list/, async function (name: string) {
    const http: TestHttpClient = this.http;
    const map: RandomValueMap = this.map;

    const response = await http.get('/students');
    if (!response.ok) {
        throw new Error(response.toString());
    }

    const studentList = JSON.parse(response.value);
    const names: string[] = studentList.map(student => student.name);
    expect(names).to.not.contain(map.get(name));
});
