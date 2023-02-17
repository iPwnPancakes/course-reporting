import { After } from '@cucumber/cucumber';
import { CompositionRoot } from '../../../src/Shared/Application/CompositionRoot/CompositionRoot';

After(async function () {
    const compositionRoot: CompositionRoot = this.compositionRoot;
    if (compositionRoot.getTypeOrmDataSource().isInitialized) {
        await compositionRoot.getTypeOrmDataSource().destroy();
    }
});
