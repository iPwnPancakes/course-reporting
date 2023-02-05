import { describe } from 'mocha';
import { InMemoryCurrentUserRepository } from './InMemoryCurrentUserRepository';

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
});
