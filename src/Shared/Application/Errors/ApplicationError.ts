export class ApplicationError implements Error {
    constructor(public readonly message: string, public readonly name: string, public readonly stack?: string) {
    }
}
