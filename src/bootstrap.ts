import { CompositionRoot } from './Shared/Application/CompositionRoot/CompositionRoot';
import { AppConfiguration } from './Shared/Application/Configuration/AppConfiguration';

const config = new AppConfiguration();
const compositionRoot = new CompositionRoot(config);
const app = compositionRoot.makeApplication();
const httpServer = compositionRoot.makeHttpServer(app);
const dbConnection = compositionRoot.makeDatabaseConnection();

dbConnection.connect()
    .then(() => httpServer.start())
    .then(() => {
        console.log('hello world');
    });
