import { configureStore } from '@reduxjs/toolkit';
import authStore from '../app/modules/auth/store/index/reducer';
import tasksStore from '../app/modules/tasks/store/index/reducer';

const store = configureStore({
  reducer: {
    tasksStore,
    authStore,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
