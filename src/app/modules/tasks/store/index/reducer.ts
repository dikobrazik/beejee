import { createSlice } from '@reduxjs/toolkit';
import { SortParams } from '../../domain/interfaces/sortParams';
import { createTask, loadTasks, setPage, setSortParams } from './actions';
import { tasksAdapter } from './adapter';

const tasksSlice = createSlice({
  name: 'tasks-index',
  initialState: tasksAdapter.getInitialState({
    loading: false,
    currentPageTasksIds: [] as number[],
    tasksCount: 0,
    page: 1,
    sort: {} as SortParams,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPage, (state, { payload }) => {
      state.page = payload;
    });
    builder.addCase(setSortParams, (state, { payload }) => {
      state.sort.direction = payload.direction;
      state.sort.field = payload.field;
    });
    builder.addCase(loadTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadTasks.fulfilled, (state, { payload }) => {
      state.currentPageTasksIds = payload.tasks.map((task) => task.id);
      state.tasksCount = payload.total_task_count;
      tasksAdapter.upsertMany(state, payload.tasks);
      state.loading = false;
    });
    builder.addCase(loadTasks.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      tasksAdapter.addOne(state, payload);
      state.tasksCount++;
      state.loading = false;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.loading = false;
    });
  },
});

type tasksStore = ReturnType<typeof tasksSlice.reducer>;
const tasksStore = tasksSlice.reducer;

export default tasksStore;
