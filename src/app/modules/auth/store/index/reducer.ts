import { createSlice } from '@reduxjs/toolkit';
import { initializeAuthentication, login, logout } from './actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    token: '',
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuthentication, (state, { payload }) => {
      state.token = payload;
    });
    builder.addCase(logout, (state) => {
      state.token = '';
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.token = payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  },
});

const authStore = authSlice.reducer;
type authStore = ReturnType<typeof authSlice.reducer>;

export const { setToken, clearToken } = authSlice.actions;

export default authStore;
