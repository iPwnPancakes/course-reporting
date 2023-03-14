import { Middleware } from './Middleware/Middleware';

export interface ICommandMapEntry {
    handler: Function,
    middleware?: Middleware[]
}

export interface CommandMap {
    [key: string]: ICommandMapEntry;
}
