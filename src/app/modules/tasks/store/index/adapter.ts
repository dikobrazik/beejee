import { createEntityAdapter } from '@reduxjs/toolkit';
import { Task } from '../../domain/interfaces/task';

export const tasksAdapter = createEntityAdapter<Task>({
  selectId: (model) => model.id,
});
