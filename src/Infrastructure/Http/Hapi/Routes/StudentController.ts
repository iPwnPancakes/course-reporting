import { IRouteController } from '../IRouteController';
import { ServerRoute } from '@hapi/hapi';
import { App } from '../../../../App';
import { makeRegisterStudentRoute } from "./RegisterStudentRoute";
import { makeGetAllStudentsRoute } from './makeGetAllStudentsRoute';

export class StudentController implements IRouteController {
    private readonly prefix: string = '/students';

    constructor(private readonly app: App) {
    }

    public getRoutes(): ServerRoute[] {
        return [
            makeGetAllStudentsRoute(this.app),
            makeRegisterStudentRoute(this.app)
        ];
    }
}
