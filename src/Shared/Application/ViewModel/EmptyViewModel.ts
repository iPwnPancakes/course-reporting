import { ViewModel } from './ViewModel';

export class EmptyViewModel implements ViewModel {
    get(key: string): any {
        return null;
    }
}
