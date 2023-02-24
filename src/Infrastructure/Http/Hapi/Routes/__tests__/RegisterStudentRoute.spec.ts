import { CompositionRoot } from "../../../../../Shared/Application/CompositionRoot/CompositionRoot";
import { AppConfiguration } from "../../../../../Shared/Application/Configuration/AppConfiguration";
import { anything, capture, instance, mock, verify, when } from "ts-mockito";
import {
    RegisterStudentCommand
} from "../../../../../Modules/Students/Commands/RegisterStudent/RegisterStudentCommand";
import { makeRegisterStudentRoute } from "../RegisterStudentRoute";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { expect } from "chai";

function makeFakeHapiRequest() {
    return mock<Request>();
}

describe('RegisterStudentRoute', function () {
    it('should call correct use case with correct request', async () => {
        const name = 'Daniel';
        const email = 'Daniel@DanielBuenrrostro.com';
        const mockStudentCommand = mock<RegisterStudentCommand>()
        const compositionRoot = new CompositionRoot(new AppConfiguration());
        const commandRouter = compositionRoot.makeCommandRouter({ [RegisterStudentCommand.key]: () => instance(mockStudentCommand) });
        const app = compositionRoot.makeApplication(commandRouter);
        const controller = makeRegisterStudentRoute(app);
        const request = makeFakeHapiRequest();
        when(request.payload).thenReturn({ name, email });
        if (typeof controller.handler !== 'function') {
            throw new Error('Controller handler property is not a function');
        }

        controller.handler(instance(request), mock<ResponseToolkit>());

        verify(mockStudentCommand.handle(anything())).called();
        const capturedCommandRequest = capture(mockStudentCommand.handle).last()[0];
        expect(capturedCommandRequest.name).to.equal(name);
        expect(capturedCommandRequest.email).to.equal(email);
    })
});