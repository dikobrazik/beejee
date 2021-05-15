import { EntityRepository } from '../../../../../infrastructure/BaseRepository';
import fetchResource from '../../../core/fetchResource';
import { Task } from '../interfaces/task';

const tasksRepository = new EntityRepository<Task>(fetchResource, '/');
export default tasksRepository;
