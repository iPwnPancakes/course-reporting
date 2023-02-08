import { describe } from 'mocha';
import { InMemoryStudentRepository } from './InMemoryStudentRepository';
import { expect } from 'chai';
import { Student } from '../../Models/Student';
import { StudentEmail } from '../../Models/StudentEmail';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryStudentRepository;

    beforeEach(() => {
        repo = new InMemoryStudentRepository([]);
    });

    describe('contains', function () {
        it('returns true if Daniel exists', () => {
            const student = new Student('Daniel', makeEmailFromString('asdf@asdf.com'));

            repo.addStudent(student);

            expect(repo.contains(student)).to.equal(true);
        });
    });

    describe('addStudent', function () {
        it('should accept "Lars"', function () {
            let student = new Student('Lars', makeEmailFromString('asdf@asdf.com'));

            repo.addStudent(student);

            const names = repo.getAllStudents().map((s: Student) => s.getName());
            expect(names).to.contain('Lars');
        });

        it('should not add "Frank" if they already exist', function () {
            let student = new Student('Frank', makeEmailFromString('asdf@asdf.com'));

            repo = new InMemoryStudentRepository([student]);
            repo.addStudent(student);

            expect(repo.getAllStudents().length).to.equal(1);
        });
    });
});

function makeEmailFromString(email: string): StudentEmail {
    const studentEmailOrError = StudentEmail.make(email);

    if (studentEmailOrError.ok === false) {
        throw studentEmailOrError.error;
    }

    return studentEmailOrError.value;
}
