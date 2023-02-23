import { IRouteController } from '../IRouteController';
import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { ApplicationError } from '../../../../Shared/Application/Errors/ApplicationError';
import { App } from '../../../../App';
import { RegisterStudentRequest } from "../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentRequest";
import { RegisterStudentResponse } from "../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand";

export class StudentController implements IRouteController {
    private readonly prefix: string = '/students';

    constructor(private readonly app: App) {
    }

    public getRoutes(): ServerRoute[] {
        return [
            { method: 'GET', path: this.prefix + '', handler: this.handleRootPathRoute.bind(this) },
            { method: 'POST', path: this.prefix + '/addStudent', handler: this.addStudent.bind(this) }
        ];
    }

    private handleRootPathRoute(): any {
        return 'hello world';
    }

    private async addStudent(req: Request<any>, h: ResponseToolkit): Promise<any> {
        if (req.payload.name === undefined || req.payload.email === undefined) {
            return h.response('Missing name or email').code(400);
        }

        const createStudentRequest = new RegisterStudentRequest(String(req.payload.name), String(req.payload.email));
        const response = await this.app.route<RegisterStudentResponse>(createStudentRequest);

        if (response.ok === false) {
            const error = response.error;
            if (error instanceof ApplicationError) {
                return h.response(response.error.message).code(400);
            }

            return h.response(response.error.message).code(500);
        }

        return 'ok';
    }
}
