import { describe } from 'mocha';
import { InMemoryCurrentUserRepository } from './InMemoryCurrentUserRepository';
import { expect } from 'chai';

describe('InMemoryCurrentUserRepository', () => {
    let repo: InMemoryCurrentUserRepository;

    beforeEach(() => {
        repo = new InMemoryCurrentUserRepository();
    });

    describe('setting current user', () => {
        it('accepts "Daniel"', () => {
            repo.setCurrentUser('Daniel');
        });
    });

    describe('getting current user', () => {
        it('gets current user after its been set', () => {
            repo.setCurrentUser('Daniel');
            expect(repo.getCurrentUser()).to.equal('Daniel');
        });
    });
});
