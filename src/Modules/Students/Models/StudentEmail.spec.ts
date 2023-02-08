import { StudentEmail } from './StudentEmail';
import { expect } from 'chai';

describe('StudentEmail', function () {
    describe('static make', function () {
        it('should accept "asdf@asdf.com"', () => {
            const emailOrError = StudentEmail.make('asdf@asdf.com') as { ok: true, value: StudentEmail };

            expect(emailOrError.ok).to.equal(true);
            expect(emailOrError.value.toString()).to.equal('asdf@asdf.com');
        });
    });
});
