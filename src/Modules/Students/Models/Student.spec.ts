import { Student } from './Student';
import { expect } from 'chai';

describe('Student', function () {
    describe('make', function () {
        it('Given the name "Daniel" should make a new Student with name "Daniel"', () => {
            const student = Student.make('Daniel', '');

            expect(student.getName()).to.equal('Daniel');
        });

        it('Given the email "asdf@asdf.com" should make a new Student with email "asdf@asdf.com"', () => {
            const student = Student.make('Daniel', 'asdf@asdf.com');

            expect(student.getEmail()).to.equal('asdf@asdf.com');
        });
    });
});
