import { IRouteController } from '../IRouteController';
import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { RegisterStudentCommand } from '../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand';
import { RegisterStudentRequest } from '../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentRequest';
import { ApplicationError } from '../../../../Shared/Application/Errors/ApplicationError';

export class StudentController implements IRouteController {
    private readonly prefix: string = '/students';

    constructor(private readonly registerStudentHandler: RegisterStudentCommand) {
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

        const dto: RegisterStudentRequest = { name: String(req.payload.name), email: String(req.payload.email) };

        const response = await this.registerStudentHandler.handle(dto);
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
