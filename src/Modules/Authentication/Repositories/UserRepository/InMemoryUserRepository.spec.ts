import { describe } from 'mocha';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { expect } from 'chai';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryUserRepository;

    beforeEach(() => {
        repo = new InMemoryUserRepository([]);
    });

    describe('getting all users', function () {
        it('should return "Daniel" if they exist', function () {
            repo = new InMemoryUserRepository(['Daniel']);

            const user = repo.getIfExists('Daniel');

            expect(user).to.equal('Daniel');
        });
    });

    describe('adding users', function () {
        it('should accept "Lars"', function () {
            repo.addUser('Lars');

            expect(repo.getIfExists('Lars')).to.equal('Lars');
        });
    });

    describe('adding duplicate users', function () {
        it('should not add "Frank" if they already exist', function () {
            repo = new InMemoryUserRepository(['Frank']);

            expect(repo.getNumberOfUsers()).to.equal(1);
        });
    });
});
