import { InMemoryStudentRepository } from '../InMemoryStudentRepository/InMemoryStudentRepository';
import { TypeOrmStudentRepository } from '../TypeOrmStudentRepository/TypeOrmStudentRepository';
import { Student } from '../../../Models/Student';
import { expect } from 'chai';
import { before } from 'mocha';
import { IStudentRepository } from '../IStudentRepository';
import { faker } from '@faker-js/faker';
import { CompositionRoot } from '../../../../../Shared/Application/CompositionRoot/CompositionRoot';
import { DataSource } from 'typeorm';
import { AppConfiguration } from '../../../../../Shared/Application/Configuration/AppConfiguration';

describe('StudentRepository contract tests', function () {
    let userRepositories: IStudentRepository[];
    let dbConnection: DataSource;

    before(async () => {
        let config = new AppConfiguration();
        let compositionRoot = new CompositionRoot(config);
        dbConnection = await compositionRoot.getTypeOrmDataSource().initialize();

        userRepositories = [new InMemoryStudentRepository(), new TypeOrmStudentRepository(dbConnection)];
    });

    after(async function () {
        await dbConnection.destroy();
    });

    describe('addStudent', function () {
        it('inserts users correctly', async () => {
            for (let i = 0; i < userRepositories.length; i++) {
                const student = makeStudent();
                const repo = userRepositories[i];

                await repo.addStudent(student);

                const allStudents = await repo.getAllStudents();
                const indexOfStudent = allStudents.findIndex((s: Student) => s.equals(student));
                expect(indexOfStudent).to.not.equal(-1, 'Student was not found when getting all students');
            }
        });
    });

    describe('contains', function () {
        it('return matches across contracts when Student was not added', async () => {
            for (let i = 0; i < userRepositories.length; i++) {
                const student = makeStudent();
                const repo = userRepositories[i];

                expect(await repo.contains(student)).to.be.false;
            }
        });

        it('return matches across contracts when Student exists', async () => {
            for (let i = 0; i < userRepositories.length; i++) {
                const student = makeStudent();
                const repo = userRepositories[i];

                await repo.addStudent(student);

                expect(await repo.contains(student)).to.be.true;
            }
        });
    });
});

function makeStudent(): Student {
    const studentOrError = Student.make(faker.name.firstName(), faker.internet.email());
    if (studentOrError.ok === false) {
        throw studentOrError.error;
    }

    return studentOrError.value;
}
