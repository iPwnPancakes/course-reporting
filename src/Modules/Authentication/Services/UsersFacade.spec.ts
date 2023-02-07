import { InMemoryStudentRepository } from '../../Students/Repositories/StudentRepository/InMemoryStudentRepository';
import { UsersFacade } from './UsersFacade';
import { expect } from 'chai';
import { IStudentRepository } from '../../Students/Repositories/StudentRepository/IStudentRepository';

describe('UsersFacade', function () {
    let userRepo: IStudentRepository = new InMemoryStudentRepository();
    let facade = new UsersFacade(userRepo);

    beforeEach(() => {
        userRepo = new InMemoryStudentRepository();
        facade = new UsersFacade(userRepo);
    });

    describe('doesUserExist', function () {
        it('should return true if user exists in user repository ', function () {
            userRepo.addUser('Daniel');
            expect(facade.doesUserExist('Daniel')).to.equal(true);
        });

        it('should return false if user does not exist in user repository', () => {
            expect(facade.doesUserExist('Daniel')).to.equal(false);
        });
    });

    describe('registerUser', function () {
        it('should return true if user facade accepts name', () => {
            expect(facade.registerUser('Daniel')).to.equal(true);
        });

        it('should return false if user facade throws for any reason', () => {
            userRepo = {
                addUser: (name) => {
                    throw new Error('DB is down :(');
                },
                getIfExists(name: string): string | null {
                    return null;
                },
                getNumberOfUsers(): Number {
                    return 0;
                },
                getAllUsers(): string[] {
                    return [];
                }
            };

            facade = new UsersFacade(userRepo);

            expect(facade.registerUser('Daniel')).to.equal(false);
        });
    });
});
