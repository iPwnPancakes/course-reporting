export interface ICommandMapEntry {
    handler: Function,
    middleware?: Function[]
}

export interface CommandMap {
    [key: string]: ICommandMapEntry;
}
