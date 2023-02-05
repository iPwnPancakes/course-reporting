import { InMemoryUserRepository } from '../Repositories/InMemoryUserRepository';
import { UsersFacade } from './UsersFacade';
import { expect } from 'chai';

describe('UsersFacade', function () {
    let userRepo = new InMemoryUserRepository();
    let facade = new UsersFacade(userRepo);

    beforeEach(() => {
        userRepo = new InMemoryUserRepository();
        facade = new UsersFacade(userRepo);
    });

    describe('doesUserExist', function () {
        it('should return true if user exists in user repository ', function () {
            userRepo.addUser('Daniel');
            expect(facade.doesUserExist('Daniel')).to.equal(true);
        });

        it('should return false if user does not exist in user repository', () => {
            expect(facade.doesUserExist('Daniel')).to.equal(false);
        });
    });

    describe('registerUser', function () {
        it('should return true if user facade accepts name', () => {
            expect(facade.registerUser('Daniel')).to.equal(true);
        });
    });
});
