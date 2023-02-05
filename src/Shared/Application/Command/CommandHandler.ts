export interface CommandHandler<RequestType, ResponseType> {
    handle(request: RequestType): ResponseType;
}
