export class InMemoryCurrentUserRepository {
    private currentUser: string | null = null;

    setCurrentUser(user: string) {
        this.currentUser = user;
    }

    getCurrentUser(): string | null {
        return this.currentUser;
    }
}
