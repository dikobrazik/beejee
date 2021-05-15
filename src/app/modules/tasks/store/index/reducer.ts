import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../domain/interfaces/task';
import { loadTasks } from './actions';

const tasksIndexStore = createSlice({
  name: 'tasks-index',
  initialState: { loading: false, tasks: [] as Task[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload.tasks;
      state.loading = false;
    });
    builder.addCase(loadTasks.rejected, (state) => {
      state.loading = false;
    });
  },
});

type tasksStore = ReturnType<typeof tasksIndexStore.reducer>;
const tasksStore = tasksIndexStore.reducer;

export default tasksStore;
