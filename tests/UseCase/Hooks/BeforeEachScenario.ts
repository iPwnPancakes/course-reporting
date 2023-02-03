import { Before } from '@cucumber/cucumber';
import { App } from '../../../src/App';

Before(function () {
    this.app = new App();
});
