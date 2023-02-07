import { describe } from 'mocha';
import { InMemoryStudentRepository } from './InMemoryStudentRepository';
import { expect } from 'chai';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryStudentRepository;

    beforeEach(() => {
        repo = new InMemoryStudentRepository([]);
    });

    describe('getting a user', function () {
        it('should return "Daniel" if they exist', function () {
            repo = new InMemoryStudentRepository(['Daniel']);

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
            repo = new InMemoryStudentRepository(['Frank']);

            expect(repo.getNumberOfUsers()).to.equal(1);
        });
    });

    describe('getting all users', function () {
        it('should return all initial users', () => {
            repo = new InMemoryStudentRepository();
            repo.addUser('Abigail');
            repo.addUser('Lars');

            expect(repo.getAllUsers()).to.contain('Abigail');
            expect(repo.getAllUsers()).to.contain('Lars');
        })

        it('should return all users added', () => {
            repo = new InMemoryStudentRepository();
            repo.addUser('Daniel');
            repo.addUser('Miguel');

            expect(repo.getAllUsers()).to.contain('Daniel');
            expect(repo.getAllUsers()).to.contain('Miguel');
        });
    });
});
