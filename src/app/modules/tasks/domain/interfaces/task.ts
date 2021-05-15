import { TaskStatus } from '../enums/taskStatus';

export interface Task {
  id: number;
  username: string;
  email: string;
  text: string;
  status: TaskStatus;
}
