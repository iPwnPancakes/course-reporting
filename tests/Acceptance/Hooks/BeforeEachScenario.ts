import { Before } from '@cucumber/cucumber';
import { App } from '../../../src/App';
import { CompositionRoot } from '../../../src/Shared/Application/CompositionRoot/CompositionRoot';

Before(function () {
    const compositionRoot = new CompositionRoot();
    this.app = new App(compositionRoot);
});
