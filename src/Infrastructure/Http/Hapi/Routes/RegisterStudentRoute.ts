import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { RegisterStudentRequest } from "../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentRequest";
import { RegisterStudentResponse } from "../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand";
import { ApplicationError } from "../../../../Shared/Application/Errors/ApplicationError";
import { App } from "../../../../App";

export function makeRegisterStudentRoute(app: App): ServerRoute {
    return {
        path: '/students/addStudent',
        method: 'POST',
        handler: async (req: Request<any>, h: ResponseToolkit): Promise<any> => {
            const { name, email } = req.payload ?? {};
            if (name === undefined || email === undefined) {
                return h.response('Missing name or email').code(400);
            }

            const createStudentRequest = new RegisterStudentRequest(String(name), String(email));
            const response = await app.route<RegisterStudentResponse>(createStudentRequest);

            if (response.ok === false) {
                const error = response.error;
                if (error instanceof ApplicationError) {
                    return h.response(response.error.message).code(400);
                }

                return h.response(response.error.message).code(500);
            }

            return h.response('ok').code(200);
        }
    }
}
