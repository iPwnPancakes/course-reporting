import { CommandMediator } from '../CommandMediator';
import { CommandHandler } from '../CommandHandler';
import { CommandRequest } from '../CommandRequest';
import { expect } from 'chai';
import { CommandMap } from '../CommandMap';

describe('CommandMediator', function () {
    describe('route', function () {
        it('should route request to command with matching key', () => {
            const key = 'test';
            let handleCalled = false;
            const request: CommandRequest = { key };
            const command: CommandHandler<void> = { handle: () => { handleCalled = true; } };
            const commandMap: CommandMap = { [key]: { handler: () => command } };
            const router = new CommandMediator(commandMap);

            router.route(request);

            expect(handleCalled).to.be.true;
        });

        it('should return whatever the command handler returns', () => {
            const key = 'test';
            const request: CommandRequest = { key };
            const command: CommandHandler<{ _testProperty: Number }> = { handle: () => ({ _testProperty: -123 }) };
            const commandMap: CommandMap = { [key]: { handler: () => command } };
            const router = new CommandMediator(commandMap);

            const response = router.route<{ _testProperty: Number }>(request);

            expect(response._testProperty).to.equal(-123);
        });
    });
});
