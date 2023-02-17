import { App } from './App';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import { AppConfiguration } from './Shared/Application/Configuration/AppConfiguration';

const config = new AppConfiguration();
const compositionRoot = new CompositionRoot(config);
const app = new App(compositionRoot);

app.start().then(() => {
    console.log('hello world');
});
