export class ViewBag {
    constructor(private readonly bag: Object) {}

    get<T>(key: string): T {
        return this.bag[key];
    }
}
