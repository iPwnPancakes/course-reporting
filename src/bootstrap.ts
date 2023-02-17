import { App } from './App';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';

const compositionRoot = new CompositionRoot();
const app = new App(compositionRoot);

app.start().then(() => {
    console.log('hello world');
});
