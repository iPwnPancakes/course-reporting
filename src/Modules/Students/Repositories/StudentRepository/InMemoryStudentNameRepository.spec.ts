import { describe } from 'mocha';
import { InMemoryStudentNameRepository } from './InMemoryStudentNameRepository';
import { expect } from 'chai';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryStudentNameRepository;

    beforeEach(() => {
        repo = new InMemoryStudentNameRepository([]);
    });

    describe('getting a student', function () {
        it('should return "Daniel" if they exist', function () {
            repo = new InMemoryStudentNameRepository(['Daniel']);

            const student = repo.getIfExists('Daniel');

            expect(student).to.equal('Daniel');
        });
    });

    describe('adding students', function () {
        it('should accept "Lars"', function () {
            repo.addStudent('Lars');

            expect(repo.getIfExists('Lars')).to.equal('Lars');
        });
    });

    describe('adding duplicate students', function () {
        it('should not add "Frank" if they already exist', function () {
            repo = new InMemoryStudentNameRepository(['Frank']);

            expect(repo.getNumberOfStudents()).to.equal(1);
        });
    });

    describe('getting all students', function () {
        it('should return all initial students', () => {
            repo = new InMemoryStudentNameRepository();
            repo.addStudent('Abigail');
            repo.addStudent('Lars');

            expect(repo.getAllStudents()).to.contain('Abigail');
            expect(repo.getAllStudents()).to.contain('Lars');
        })

        it('should return all students added', () => {
            repo = new InMemoryStudentNameRepository();
            repo.addStudent('Daniel');
            repo.addStudent('Miguel');

            expect(repo.getAllStudents()).to.contain('Daniel');
            expect(repo.getAllStudents()).to.contain('Miguel');
        });
    });
});
