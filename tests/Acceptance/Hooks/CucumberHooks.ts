import { After, Before } from '@cucumber/cucumber';
import { CompositionRoot } from '../../../src/Shared/Application/CompositionRoot/CompositionRoot';
import { RandomValueMap } from '../TestInfrastructure/RandomValueMap';
import { AppConfiguration } from '../../../src/Shared/Application/Configuration/AppConfiguration';
import { IHttpServer } from '../../../src/Infrastructure/Http/IHttpServer';
import { IDatabaseConnection } from '../../../src/Infrastructure/DatabaseConnection/IDatabaseConnection';
import { TestHttpClient } from '../TestInfrastructure/TestHttpClient';

Before(async function () {
    const config = new AppConfiguration();
    const compositionRoot = new CompositionRoot(config);
    const app = compositionRoot.makeApplication();
    const dbConnection = compositionRoot.makeDatabaseConnection();
    const httpServer = compositionRoot.makeHttpServer(app);
    const { host, port } = config.getHttpConfiguration();

    await dbConnection.connect();
    await httpServer.start();

    this.dbConnection = dbConnection;
    this.httpServer = httpServer;
    this.app = app;
    this.map = new RandomValueMap();
    this.http = new TestHttpClient(`http://${ host }:${ port }`);
});

After(async function () {
    const httpServer: IHttpServer = this.httpServer;
    const dbConnection: IDatabaseConnection = this.dbConnection;

    await httpServer.stop();
    await dbConnection.disconnect();
});
