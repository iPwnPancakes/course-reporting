import { faker } from '@faker-js/faker';

export class RandomValueMap {
    private map = {};

    public mapKeyToAlphabeticString(key: string): void {
        this.map[key] = faker.random.alpha(30);
    }

    public mapEmailToRandomEmail(key: string): void {
        this.map[key] = faker.internet.email();
    }

    public mapKeyToValue(key: string, value: string): void {
        this.map[key] = value;
    }

    public get(key: string): string {
        if (this.map[key] === undefined) {
            throw new Error('Key does not have associated value');
        }

        return this.map[key];
    }
}
