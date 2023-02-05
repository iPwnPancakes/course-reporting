import { Before, Given, Then, When } from '@cucumber/cucumber';
import { CreateStudentCommand } from './CreateStudentCommand';
import { CreateStudentRequest } from './CreateStudentRequest';
import { expect } from 'chai';

Before(function () {
    this.useCase = new CreateStudentCommand();

    let request: CreateStudentRequest = { name: '' };
    let response: boolean = false;

    this.request = request;
    this.response = response;
});

Given('I am a Teacher', function () {
});

When(/I go to register a new Student named (.*)/, function (name: string) {
    const request: CreateStudentRequest = this.request;
    const useCase: CreateStudentCommand = this.useCase;

    request.name = name;

    this.response = useCase.handle(request);
});

Then(/I should see (.*) in the Student List/, function (name: string) {
    const response: boolean = this.response;

    expect(response).to.equal(true);
});

