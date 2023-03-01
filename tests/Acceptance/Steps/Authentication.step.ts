import { Given, Then, When } from '@cucumber/cucumber';
import { App } from '../../../src/App';

Given(/I am a Teacher/, function () {
    const app: App = this.app;
    app.login('');
});
