import { ResponseStatus } from './ResponseStatus';

export interface Response<T> {
  message: T;
  status: ResponseStatus;
}
