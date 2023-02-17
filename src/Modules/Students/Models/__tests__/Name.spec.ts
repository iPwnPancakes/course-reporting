import { Name } from '../Name';
import { expect } from 'chai';

describe('Name', function () {
    describe('make', function () {
        it('should accept "Daniel" as a name', () => {
            let nameOrError = Name.make('Daniel');

            expect(nameOrError.ok).to.equal(true);
        });

        it('should return the Name object if accepted', () => {
            let nameOrError = Name.make('Daniel') as { ok: true, value: Name };

            expect(nameOrError.value instanceof Name).to.equal(true);
        });

        it('should NOT accept "Dani3l" as a name', () => {
            let nameOrError = Name.make('Dani3l');

            expect(nameOrError.ok).to.equal(false);
        });

        it('should return the reason that a name was not accepted', () => {
            let nameOrError = Name.make('Dani3l');
            if (nameOrError.ok === true) {
                throw new Error('should have failed');
            }

            expect(nameOrError.error instanceof Error).to.equal(true);
        });
    });
});
