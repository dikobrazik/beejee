import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../domain/interfaces/task';
import tasksRepository from '../../domain/repositories/tasksRepository';

const PREFIX = 'tasks/index';

export const loadTasks = createAsyncThunk(`${PREFIX}/loadTasks`, () =>
  tasksRepository.load<{ tasks: Task[]; total_task_count: number }>()
);
