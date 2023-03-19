import { CommandMediator } from '../CommandMediator';
import { CommandHandler } from '../CommandHandler';
import { CommandRequest } from '../CommandRequest';
import { expect } from 'chai';
import { CommandMap } from '../CommandMap';
import { Middleware } from '../Middleware/Middleware';
import { ViewBag } from '../../ViewBag/ViewBag';

describe('CommandMediator', function () {
    describe('route', function () {
        it('should route request to command with matching key', async () => {
            const key = 'test';
            let handleCalled = false;
            const request: CommandRequest = { key };
            const command: CommandHandler = {
                handle: async () => {
                    handleCalled = true;

                    return { ok: true, value: null };
                }
            };
            const commandMap: CommandMap = { [key]: { handler: command } };
            const router = new CommandMediator(commandMap);

            await router.route(request);

            expect(handleCalled).to.be.true;
        });

        it('should return whatever the command handler returns', async () => {
            const key = 'test';
            const request: CommandRequest = { key };
            const command: CommandHandler = {
                handle: async () => ({ ok: true, value: new ViewBag({ _testProperty: -123 }) })
            };
            const commandMap: CommandMap = { [key]: { handler: command } };
            const router = new CommandMediator(commandMap);

            const response = await router.route(request);

            if (response.ok) {
                expect(response.value.get<Number>('_testProperty')).to.equal(-123);
            } else {
                expect.fail('Router did not return successful result');
            }
        });
    });

    describe('Middleware functionality', function () {
        it('should run middleware', async () => {
            let wasMiddlewareCalled = false;
            const key = 'test';
            const request: CommandRequest = { key };
            const passthroughMiddleware: Middleware = createSuccessMiddleware(() => { wasMiddlewareCalled = true; });
            const command: CommandHandler = {
                handle: async () => ({ ok: true, value: new ViewBag({ _testProperty: -123 }) })
            };
            const commandMap: CommandMap = {
                [key]: {
                    handler: command,
                    middleware: [passthroughMiddleware]
                }
            };
            const router = new CommandMediator(commandMap);

            await router.route(request);

            expect(wasMiddlewareCalled).to.be.true;
        });

        it('should call handler if all middleware passes', async () => {
            let wasHandlerCalled = false;
            const key = 'test';
            const request: CommandRequest = { key };
            const passthroughMiddleware: Middleware = createSuccessMiddleware();
            const command: CommandHandler = {
                handle: async () => {
                    wasHandlerCalled = true;
                    return { ok: true, value: null };
                }
            };
            const commandMap: CommandMap = {
                [key]: {
                    handler: command,
                    middleware: [passthroughMiddleware]
                }
            };
            const router = new CommandMediator(commandMap);

            await router.route(request);

            expect(wasHandlerCalled).to.be.true;
        });

        it('should not call command if not all middleware passes', async () => {
            let wasHandlerCalled = false;
            const key = 'test';
            const request: CommandRequest = { key };
            const passthroughMiddleware: Middleware = createSuccessMiddleware();
            const failMiddleware: Middleware = createFailingMiddleware();
            const command: CommandHandler = {
                handle: async () => {
                    wasHandlerCalled = true;
                    return { ok: true, value: null };
                }
            };
            const commandMap: CommandMap = {
                [key]: {
                    handler: command,
                    middleware: [passthroughMiddleware, failMiddleware]
                }
            };
            const router = new CommandMediator(commandMap);

            await router.route(request);

            expect(wasHandlerCalled).to.be.false;
        });
    });
});

function createSuccessMiddleware(callback?: Function): Middleware {
    let nextMiddleware: Middleware = null;
    return {
        next: null,
        handle: async (request: CommandRequest) => {
            if (callback) {
                callback();
            }

            if (!nextMiddleware) {
                return { ok: true, value: null };
            }

            return nextMiddleware.handle(request);
        },
        setNext(middleware: Middleware) {
            nextMiddleware = middleware;
        }
    };
}

function createFailingMiddleware(): Middleware {
    return {
        next: null,
        handle: async (request: CommandRequest) => ({
            ok: false,
            error: new Error('Expected failure')
        }),
        setNext(middleware: Middleware) {}
    };
}
