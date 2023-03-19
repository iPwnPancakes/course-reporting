import { Middleware } from './Middleware/Middleware';
import { CommandHandler } from './CommandHandler';

export interface ICommandMapEntry {
    handler: CommandHandler,
    middleware?: Middleware[]
}

export interface CommandMap {
    [key: string]: ICommandMapEntry;
}
