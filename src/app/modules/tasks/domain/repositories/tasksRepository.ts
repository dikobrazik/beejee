import { EntityRepository } from '../../../../../infrastructure/BaseRepository';
import fetchResource from '../../../core/fetchResource';
import { Task } from '../interfaces/task';

class TasksRepository extends EntityRepository<Task> {
  updateByPost(formData: FormData, options?: RequestInit) {
    return this.resource.post(`edit/${formData.get('id')}`, formData, options);
  }
}

const tasksRepository = new TasksRepository(fetchResource, '/');
export default tasksRepository;
