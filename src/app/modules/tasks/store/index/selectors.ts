import { createSelector } from '@reduxjs/toolkit';
import tasksStore from './reducer';

const storeSelector = (state: any): tasksStore => state.tasksStore;

export const isLoadingSelector = createSelector(storeSelector, (state) => state.loading);

export const tasksSelector = createSelector(storeSelector, (state) => state.tasks);
