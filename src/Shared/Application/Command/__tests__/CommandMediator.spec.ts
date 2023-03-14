import { CommandMediator } from '../CommandMediator';
import { CommandHandler } from '../CommandHandler';
import { CommandRequest } from '../CommandRequest';
import { expect } from 'chai';
import { CommandMap } from '../CommandMap';
import { Middleware } from '../Middleware/Middleware';
import { Result } from '../../Result/Result';

describe('CommandMediator', function () {
    describe('route', function () {
        it('should route request to command with matching key', async () => {
            const key = 'test';
            let handleCalled = false;
            const request: CommandRequest = { key };
            const command: CommandHandler<Promise<Result<void>>> = {
                handle: async () => {
                    handleCalled = true;

                    return { ok: true, value: null };
                }
            };
            const commandMap: CommandMap = { [key]: { handler: () => command } };
            const router = new CommandMediator(commandMap);

            await router.route(request);

            expect(handleCalled).to.be.true;
        });

        it('should return whatever the command handler returns', async () => {
            const key = 'test';
            const request: CommandRequest = { key };
            const command: CommandHandler<{ _testProperty: Number }> = {
                handle: async () => ({ ok: true, value: { _testProperty: -123 } })
            };
            const commandMap: CommandMap = { [key]: { handler: () => command } };
            const router = new CommandMediator(commandMap);

            const response = await router.route<{ _testProperty: Number }>(request);

            if (response.ok) {
                expect(response.value._testProperty).to.equal(-123);
            } else {
                expect.fail('Router did not return successful result');
            }
        });
    });

    describe('Middleware functionality', function () {
        it('should run middleware', () => {
            let wasMiddlewareCalled = false;
            const key = 'test';
            const request: CommandRequest = { key };
            const passthroughMiddleware: Middleware = {
                handle(request: CommandRequest, next ?: Middleware) {
                    wasMiddlewareCalled = true;
                    return true;
                }
            };
            const command: CommandHandler<{ _testProperty: Number }> = {
                handle: async () => ({ ok: true, value: { _testProperty: -123 } })
            };
            const commandMap: CommandMap = {
                [key]: {
                    handler: () => command,
                    middleware: [passthroughMiddleware]
                }
            };
            const router = new CommandMediator(commandMap);

            router.route(request);

            expect(wasMiddlewareCalled).to.be.true;
        });

        it('should call handler if all middleware passes', () => {
            let wasHandlerCalled = false;
            const key = 'test';
            const request: CommandRequest = { key };
            const passthroughMiddleware: Middleware = { handle: (request: CommandRequest, next ?: Middleware) => true };
            const command: CommandHandler<void> = {
                handle: async () => {
                    wasHandlerCalled = true;
                    return { ok: true, value: null };
                }
            };
            const commandMap: CommandMap = {
                [key]: {
                    handler: () => command,
                    middleware: [passthroughMiddleware]
                }
            };
            const router = new CommandMediator(commandMap);

            router.route(request);

            expect(wasHandlerCalled).to.be.true;
        });

        it('should not call command if not all middleware passes', () => {
            let wasHandlerCalled = false;
            const key = 'test';
            const request: CommandRequest = { key };
            const passthroughMiddleware: Middleware = { handle: (request: CommandRequest, next ?: Middleware) => true };
            const failMiddleware: Middleware = { handle: (request: CommandRequest, next?: Middleware) => false };
            const command: CommandHandler<void> = {
                handle: async () => {
                    wasHandlerCalled = true;
                    return { ok: true, value: null };
                }
            };
            const commandMap: CommandMap = {
                [key]: {
                    handler: () => command,
                    middleware: [passthroughMiddleware, failMiddleware]
                }
            };
            const router = new CommandMediator(commandMap);

            router.route(request);

            expect(wasHandlerCalled).to.be.false;
        });
    });
});
