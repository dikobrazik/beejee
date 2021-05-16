import { BaseRepository } from './interfaces/BaseRepository';
import { BaseResource, RequestOptions } from './interfaces/BaseResource';

export class EntityRepository<Entity> implements BaseRepository<Entity> {
  constructor(
    protected resource: BaseResource<Entity>,
    private endpoint: string,
    private defaultOptions?: RequestOptions
  ) {}

  public create<RequestResponse = Entity>(formData: FormData, options?: RequestOptions): Promise<RequestResponse> {
    return this.resource.post(`${this.endpoint}/create`, formData, options);
  }
  public load<RequestResponse = Entity>(
    params?: Record<string, string>,
    options?: RequestOptions
  ): Promise<RequestResponse> {
    return this.resource.get(this.endpoint, params, options);
  }
  public update<RequestResponse = Entity>(entity: Entity, options?: RequestOptions): Promise<RequestResponse> {
    return this.resource.put(this.endpoint, entity, options);
  }
  public patch<RequestResponse = Entity>(entity: Entity, options?: RequestOptions): Promise<RequestResponse> {
    return this.resource.patch(this.endpoint, entity, options);
  }
  public delete<RequestResponse = Entity>(entity: Entity, options?: RequestOptions): Promise<RequestResponse> {
    return this.resource.delete(this.endpoint, entity, options);
  }

  public composeOptions(options: RequestOptions) {
    return { ...this.defaultOptions, ...options };
  }
}
