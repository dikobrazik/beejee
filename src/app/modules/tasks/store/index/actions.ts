import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { SortParams } from '../../domain/interfaces/sortParams';
import { Task } from '../../domain/interfaces/task';
import tasksRepository from '../../domain/repositories/tasksRepository';
import { tasksPageSelector, tasksSortParamsSelector } from './selectors';

const PREFIX = 'tasks/index';

type TasksListResponse = { tasks: Task[]; total_task_count: number };
type LoadTasksOptions =
  | {
      page?: number;
      sort?: SortParams;
    }
  | undefined;

export const setPage = createAction<number>(`${PREFIX}/setPage`);
export const setSortParams = createAction<SortParams>(`${PREFIX}/setSortParams`);

export const createTask = createAsyncThunk<Task, FormData>(`${PREFIX}/createTask`, async (task, { dispatch }) => {
  const createdTask = await tasksRepository.create(task);
  dispatch(loadTasks());
  return createdTask;
});

export const loadTasks = createAsyncThunk<TasksListResponse, LoadTasksOptions>(
  `${PREFIX}/loadTasks`,
  (params, { dispatch, getState }) => {
    const currentPage = tasksPageSelector(getState());
    const currentSortParams = tasksSortParamsSelector(getState());
    const { page = currentPage, sort } = params || {};
    const sort_field = sort?.field || currentSortParams.field || '';
    const sort_direction = sort?.direction || currentSortParams.direction || '';
    batch(() => {
      dispatch(setPage(page));
      dispatch(setSortParams({ field: sort_field, direction: sort_direction }));
    });
    return tasksRepository.load<TasksListResponse>({ page: page + '', sort_field, sort_direction });
  }
);
