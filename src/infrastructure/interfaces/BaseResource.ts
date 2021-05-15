import { Response } from './Response';

export type QueryParams = Record<string, string>;
export type RequestOptions = RequestInit & { queryParams: Record<string, string> };

export interface BaseResource<Entity> {
  post<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestInit
  ): Promise<Response<ResponsePayload>['message']>;
  get<ResponsePayload = Entity>(
    endpoint: string,
    params?: QueryParams,
    options?: RequestInit
  ): Promise<Response<ResponsePayload>['message']>;
  put<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestInit
  ): Promise<Response<ResponsePayload>['message']>;
  patch<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestInit
  ): Promise<Response<ResponsePayload>['message']>;
  delete<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestInit
  ): Promise<Response<ResponsePayload>['message']>;
}
