import { RequestRouter } from './Router/RequestRouter';
import { CommandMap } from './Router/CommandMap';
import { CreateStudentHandler } from '../../Modules/Students/Commands/CreateStudent/CreateStudentHandler';

export class CompositionRoot {
    makeRouter(map: CommandMap): RequestRouter {
        return new RequestRouter(map);
    }

    makeCreateStudentHandler(): CreateStudentHandler {
        return new CreateStudentHandler();
    }
}
