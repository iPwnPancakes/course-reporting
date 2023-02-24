import { IRouteController } from '../IRouteController';
import { ServerRoute } from '@hapi/hapi';
import { App } from '../../../../App';
import { makeRegisterStudentRoute } from "./RegisterStudentRoute";

export class StudentController implements IRouteController {
    private readonly prefix: string = '/students';

    constructor(private readonly app: App) {
    }

    public getRoutes(): ServerRoute[] {
        return [
            { method: 'GET', path: this.prefix + '', handler: this.handleRootPathRoute.bind(this) },
            makeRegisterStudentRoute(this.app)
        ];
    }

    private handleRootPathRoute(): any {
        return 'hello world';
    }
}
