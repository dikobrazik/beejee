import { configureStore } from '@reduxjs/toolkit';
import tasksStore from '../app/modules/tasks/store/index/reducer';

const store = configureStore({
  reducer: {
    tasksStore,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
