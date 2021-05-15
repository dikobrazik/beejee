import { RequestOptions } from './BaseResource';

export interface BaseRepository<Entity> {
  create<ResponsePayload = Entity>(entity: Entity, options?: RequestOptions): Promise<ResponsePayload>;
  load<ResponsePayload = Entity>(params?: Record<string, string>, options?: RequestOptions): Promise<ResponsePayload>;
  update<ResponsePayload = Entity>(entity: Entity, options?: RequestOptions): Promise<ResponsePayload>;
  patch<ResponsePayload = Entity>(entity: Entity, options?: RequestOptions): Promise<ResponsePayload>;
  delete<ResponsePayload = Entity>(entity: Entity, options?: RequestOptions): Promise<ResponsePayload>;
}
