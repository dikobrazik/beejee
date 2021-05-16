import { createSelector } from '@reduxjs/toolkit';
import authStore from './reducer';

const storeSelector = (state: any): authStore => state.authStore;

export const isAuthLoadingSelector = createSelector(storeSelector, (state) => state.loading);
export const authTokenSelector = createSelector(storeSelector, (state) => state.token);
export const isAuthorizedSelector = createSelector(authTokenSelector, (token) => !!token);
