export interface Command<RequestType, ResponseType> {
    handle(request: RequestType): ResponseType;
}
