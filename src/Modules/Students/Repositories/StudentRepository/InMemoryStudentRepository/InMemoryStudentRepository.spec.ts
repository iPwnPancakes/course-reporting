import { describe } from 'mocha';
import { InMemoryStudentRepository } from './InMemoryStudentRepository';
import { expect } from 'chai';
import { Student } from '../../../Models/Student';

describe('InMemoryUserRepository', function () {
    let repo: InMemoryStudentRepository;

    beforeEach(() => {
        repo = new InMemoryStudentRepository([]);
    });

    describe('contains', function () {
        it('returns true if Daniel exists', async () => {
            const student = makeStudentFrom('Daniel', 'asdf@asdf.com');

            await repo.addStudent(student);

            let hasStudent = await repo.contains(student);
            expect(hasStudent).to.equal(true);
        });
    });

    describe('addStudent', function () {
        it('should accept "Lars"', async () => {
            let student = makeStudentFrom('Lars', 'asdf@asdf.com');

            await repo.addStudent(student);

            const allStudents = await repo.getAllStudents();
            const names = allStudents.map((s: Student) => s.getName());
            expect(names).to.contain('Lars');
        });

        it('should not add "Frank" if they already exist', async () => {
            let student = makeStudentFrom('Frank', 'asdf@asdf.com');

            repo = new InMemoryStudentRepository([student]);
            await repo.addStudent(student);

            const allStudents = await repo.getAllStudents();
            expect(allStudents.length).to.equal(1);
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
