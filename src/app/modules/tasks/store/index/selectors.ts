import { createSelector } from '@reduxjs/toolkit';
import { Task } from '../../domain/interfaces/task';
import { tasksAdapter } from './adapter';
import tasksStore from './reducer';

const storeSelector = (state: any): tasksStore => state.tasksStore;

export const isLoadingSelector = createSelector(storeSelector, (state) => state.loading);

export const tasksSelector = createSelector(storeSelector, (state) =>
  state.currentPageTasksIds.map((id) => tasksAdapter.getSelectors().selectById(state, id) as Task)
);

export const tasksCountSelector = createSelector(storeSelector, (state) => state.tasksCount);

export const tasksPageSelector = createSelector(storeSelector, (state) => state.page);

export const tasksSortParamsSelector = createSelector(storeSelector, (state) => state.sort);
