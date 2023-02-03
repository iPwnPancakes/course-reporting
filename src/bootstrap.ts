import { App } from './App';
import { CreateStudentRequest } from './Modules/Students/Commands/CreateStudent/CreateStudentRequest';
import { CompositionRoot } from './Shared/Application/CompositionRoot';
import { CommandMap } from './Shared/Application/Router/CommandMap';
import { CreateStudentHandler } from './Modules/Students/Commands/CreateStudent/CreateStudentHandler';

const compositionRoot = new CompositionRoot();

const createStudentCommand: CreateStudentHandler = compositionRoot.makeCreateStudentHandler();
const commandMap: CommandMap = { 'CreateStudentHandler': createStudentCommand };
const router = compositionRoot.makeRouter(commandMap);

const app = new App(router);

const request: CreateStudentRequest = { key: 'CreateStudentHandler' };

app.route(request);
