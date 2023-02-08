import { describe } from 'mocha';
import { InMemoryStudentRepository } from './InMemoryStudentRepository';
import { expect } from 'chai';
import { Student } from '../../Models/Student';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryStudentRepository;

    beforeEach(() => {
        repo = new InMemoryStudentRepository([]);
    });

    describe('contains', function () {
        it('returns true if Daniel exists', () => {
            const student = makeStudentFrom('Daniel', 'asdf@asdf.com');

            repo.addStudent(student);

            expect(repo.contains(student)).to.equal(true);
        });
    });

    describe('addStudent', function () {
        it('should accept "Lars"', function () {
            let student = makeStudentFrom('Lars', 'asdf@asdf.com');

            repo.addStudent(student);

            const names = repo.getAllStudents().map((s: Student) => s.getName());
            expect(names).to.contain('Lars');
        });

        it('should not add "Frank" if they already exist', function () {
            let student = makeStudentFrom('Frank', 'asdf@asdf.com');

            repo = new InMemoryStudentRepository([student]);
            repo.addStudent(student);

            expect(repo.getAllStudents().length).to.equal(1);
        });
    });
});

function makeStudentFrom(name: string, email: string): Student {
    const studentOrError = Student.make(name, email);

    if (studentOrError.ok === false) {
        throw studentOrError.error;
    }

    return studentOrError.value;
}
