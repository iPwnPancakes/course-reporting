import { After, Before } from '@cucumber/cucumber';
import { App } from '../../../src/App';
import { CompositionRoot } from '../../../src/Shared/Application/CompositionRoot/CompositionRoot';
import { RandomValueMap } from '../TestInfrastructure/RandomValueMap';

Before(async function () {
    const compositionRoot = new CompositionRoot();
    const app = new App(compositionRoot);

    await app.start();

    this.compositionRoot = compositionRoot;
    this.app = app;
    this.map = new RandomValueMap();
});

After(async function () {
    const compositionRoot: CompositionRoot = this.compositionRoot;
    if (compositionRoot.getTypeOrmDataSource().isInitialized) {
        await compositionRoot.getTypeOrmDataSource().destroy();
    }
});
