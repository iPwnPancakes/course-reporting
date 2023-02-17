import { App } from './App';
import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import 'reflect-metadata';

const compositionRoot = new CompositionRoot();
const dataSource = compositionRoot.makeDataSource();
console.log(dataSource);
const app = new App(compositionRoot);

app.start();
