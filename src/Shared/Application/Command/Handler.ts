import { Request } from './Request';
import { ViewModel } from '../ViewModel/ViewModel';

export interface Handler {
    handle(request: Request): ViewModel;
}
