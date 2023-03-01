import { App } from '../../../../App';
import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { ApplicationError } from '../../../../Shared/Application/Errors/ApplicationError';
import {
    GetAllRegisteredStudentsRequest
} from '../../../../Modules/Students/Commands/GetAllRegisteredStudents/GetAllRegisteredStudentsRequest';
import {
    GetAllRegisteredStudentsResponse
} from '../../../../Modules/Students/Commands/GetAllRegisteredStudents/GetAllRegisteredStudentsHandler';

export function makeGetAllStudentsRoute(app: App): ServerRoute {
    return {
        path: '/students',
        method: 'GET',
        handler: async (req: Request<any>, h: ResponseToolkit): Promise<any> => {
            const getAllStudentsRequest = new GetAllRegisteredStudentsRequest();
            const response = await app.route<GetAllRegisteredStudentsResponse>(getAllStudentsRequest);

            if (response.ok === false) {
                const error = response.error;
                if (error instanceof ApplicationError) {
                    return h.response(response.error.message).code(400);
                }

                return h.response(response.error.message).code(500);
            }

            return h.response(response.value).code(200);
        }
    };
}
