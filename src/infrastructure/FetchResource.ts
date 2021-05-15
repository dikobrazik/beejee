import { BaseResource, QueryParams, RequestOptions } from './interfaces/BaseResource';
import { Response } from './interfaces/Response';
import { ResponseStatus } from './interfaces/ResponseStatus';

export class FetchResource<Entity> implements BaseResource<Entity> {
  constructor(private url: string, private defaultOptions: RequestOptions) {}

  public post<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestOptions
  ): Promise<ResponsePayload> {
    const requestUrl = this.getRequestPath(endpoint, options?.queryParams);
    const requestOptions = this.getRequestOptions({ ...options, body: JSON.stringify(body) });
    return this.makeRequest<ResponsePayload>(requestUrl, requestOptions);
  }
  public get<ResponsePayload = Entity>(
    endpoint: string,
    params?: QueryParams,
    options?: RequestOptions
  ): Promise<ResponsePayload> {
    const requestUrl = this.getRequestPath(endpoint, params);
    const requestOptions = this.getRequestOptions(options);
    return this.makeRequest<ResponsePayload>(requestUrl, requestOptions);
  }
  public put<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestOptions
  ): Promise<ResponsePayload> {
    const requestUrl = this.getRequestPath(endpoint, options?.queryParams);
    const requestOptions = this.getRequestOptions({ ...options, body: JSON.stringify(body) });
    return this.makeRequest<ResponsePayload>(requestUrl, requestOptions);
  }
  public patch<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestOptions
  ): Promise<ResponsePayload> {
    const requestUrl = this.getRequestPath(endpoint, options?.queryParams);
    const requestOptions = this.getRequestOptions({ ...options, body: JSON.stringify(body) });
    return this.makeRequest<ResponsePayload>(requestUrl, requestOptions);
  }
  public delete<ResponsePayload = Entity>(
    endpoint: string,
    body?: Entity,
    options?: RequestOptions
  ): Promise<ResponsePayload> {
    const requestUrl = this.getRequestPath(endpoint, options?.queryParams);
    const requestOptions = this.getRequestOptions({ ...options, body: JSON.stringify(body) });
    return this.makeRequest<ResponsePayload>(requestUrl, requestOptions);
  }

  private makeRequest<ResponsePayload = Entity>(path: string, options: RequestInit): Promise<ResponsePayload> {
    return fetch(path, options).then((response) => this.handleResponse<ResponsePayload>(response));
  }

  private async handleResponse<ResponsePayload = Entity>(response: globalThis.Response): Promise<ResponsePayload> {
    const json: Response<ResponsePayload> = await response.json();
    if (json.status === ResponseStatus.ERROR) {
      throw json.message;
    }
    return json.message;
  }

  private getRequestOptions(options?: RequestInit) {
    return { ...this.defaultOptions, ...options };
  }

  private getRequestPath(endpoint: string, params?: QueryParams) {
    const queryString = Object.entries({ ...this.defaultOptions.queryParams, ...params })
      .reduce(
        (pairs, [key, value]) => pairs.concat(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`),
        [] as string[]
      )
      .join('&');
    return `${this.url}/${endpoint}/?${queryString}`.replace(/([^:]\/)\/+/g, '$1');
  }
}
