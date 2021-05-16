import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchResource from '../../../core/fetchResource';

export const AUTH_TOKEN = `@auth-token`;

const PREFIX = 'auth';

export const logout = createAction(`${PREFIX}/logout`, () => {
  localStorage.removeItem(AUTH_TOKEN);
  return { payload: null };
});

export const initializeAuthentication = createAction(`${PREFIX}/initializeAuthentication`, () => ({
  payload: localStorage.getItem(AUTH_TOKEN) as string,
}));

export const login = createAsyncThunk<string, FormData>(`${PREFIX}/login`, async (payload, { rejectWithValue }) => {
  try {
    const response = await fetchResource.post<{ token: string }>('/login', payload);
    localStorage.setItem(AUTH_TOKEN, response.token);
    return response.token;
  } catch (error) {
    return rejectWithValue(error);
  }
});
