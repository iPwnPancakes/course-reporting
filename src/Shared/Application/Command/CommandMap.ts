import { CommandHandler } from "./CommandHandler";

export interface CommandMap {
    [key: string]: CommandHandler
}