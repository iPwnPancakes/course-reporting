import { CommandMediator } from "../CommandMediator";
import { CommandHandler } from "../CommandHandler";
import { CommandRequest } from "../CommandRequest";
import { expect } from "chai";
import { CommandMap } from "../CommandMap";

describe('CommandMediator', function () {
    describe('route', function () {
        it('should route request to command with matching key', () => {
            const key = 'test';
            let handleCalled = false;
            const request: CommandRequest = { key };
            const command: CommandHandler = { key, handle() { handleCalled = true; } };
            const commandMap: CommandMap = { [key]: command };
            const router = new CommandMediator(commandMap);

            const response = router.route(request);

            expect(handleCalled).to.be.true;
        });
    });
});