import { Student } from '../Student';
import { expect } from 'chai';

describe('Student', function () {
    describe('make', function () {
        it('Given the name "Daniel" should make a new Student with name "Daniel"', () => {
            const studentOrError = Student.make('Daniel', 'asdf@asdf.com') as { ok: true, value: Student };

            expect(studentOrError.value.getName()).to.equal('Daniel');
        });

        it('Given the email "asdf@asdf.com" should make a new Student with email "asdf@asdf.com"', () => {
            const studentOrError = Student.make('Daniel', 'asdf@asdf.com') as { ok: true, value: Student };

            expect(studentOrError.value.getEmail()).to.equal('asdf@asdf.com');
        });
    });
});
