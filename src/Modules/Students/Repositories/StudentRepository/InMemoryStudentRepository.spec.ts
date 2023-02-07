import { describe } from 'mocha';
import { InMemoryStudentRepository } from './InMemoryStudentRepository';
import { expect } from 'chai';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryStudentRepository;

    beforeEach(() => {
        repo = new InMemoryStudentRepository([]);
    });

    describe('getting a student', function () {
        it('should return "Daniel" if they exist', function () {
            repo = new InMemoryStudentRepository(['Daniel']);

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
            repo = new InMemoryStudentRepository(['Frank']);

            expect(repo.getNumberOfStudents()).to.equal(1);
        });
    });

    describe('getting all students', function () {
        it('should return all initial students', () => {
            repo = new InMemoryStudentRepository();
            repo.addStudent('Abigail');
            repo.addStudent('Lars');

            expect(repo.getAllStudents()).to.contain('Abigail');
            expect(repo.getAllStudents()).to.contain('Lars');
        })

        it('should return all students added', () => {
            repo = new InMemoryStudentRepository();
            repo.addStudent('Daniel');
            repo.addStudent('Miguel');

            expect(repo.getAllStudents()).to.contain('Daniel');
            expect(repo.getAllStudents()).to.contain('Miguel');
        });
    });
});
