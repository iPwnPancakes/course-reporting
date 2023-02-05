import { Given, Then, When } from '@cucumber/cucumber';
import { CreateStudentCommand } from './CreateStudentCommand';
import { CreateStudentRequest } from './CreateStudentRequest';
import { expect } from 'chai';

const useCase = new CreateStudentCommand();
let request: CreateStudentRequest = { name: '' };
let response: boolean = false;

Given('I am a Teacher', function () {
});

When(/I go to register a new Student named (.*)/, function (name: string) {
    request.name = name;

    response = useCase.handle(request);
});

Then(/I should see (.*) in the Student List/, function (name: string) {
    expect(response).to.equal(true);
});

