import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { User } from '../model/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined
}

export const reducers: ActionReducerMap<AuthState> = { user: undefined };


export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];
