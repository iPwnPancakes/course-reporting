export interface HttpResponse<T> {
    ok: boolean,
    value: T
}

export class TestHttpClient {
    constructor(private readonly url: string) {
    }

    public async get(endpoint: string): Promise<HttpResponse<string>> {
        const response = await fetch(this.url + endpoint, { method: 'GET' });

        const responseBody = await response.text();

        return { ok: response.ok, value: responseBody };
    }

    public async post(endpoint: string, body?: object): Promise<HttpResponse<string>> {
        const response = await fetch(this.url + endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseBody = await response.text();

        return { ok: response.ok, value: responseBody };
    }
}
