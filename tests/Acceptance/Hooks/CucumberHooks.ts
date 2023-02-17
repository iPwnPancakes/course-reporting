import { After, Before } from '@cucumber/cucumber';
import { App } from '../../../src/App';
import { CompositionRoot } from '../../../src/Shared/Application/CompositionRoot/CompositionRoot';
import { RandomValueMap } from '../TestInfrastructure/RandomValueMap';
import { AppConfiguration } from '../../../src/Shared/Application/Configuration/AppConfiguration';

Before(async function () {
    const config = new AppConfiguration();
    const compositionRoot = new CompositionRoot(config);
    const app = new App(compositionRoot);

    await app.start();

    this.compositionRoot = compositionRoot;
    this.app = app;
    this.map = new RandomValueMap();
});

After(async function () {
    const compositionRoot: CompositionRoot = this.compositionRoot;
    await compositionRoot.makeDatabaseConnection().disconnect();
});
