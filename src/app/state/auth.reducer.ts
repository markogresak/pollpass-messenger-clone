import { createReducer, on } from '@ngrx/store';
import { AuthGrant } from '../types';
import {
  updateAuthGrant,
  updateAuthGrantFailure,
  updateAuthGrantSuccess,
} from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  authGrant: AuthGrant | null;
  errorMessage: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  authGrant: null,
  errorMessage: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(updateAuthGrant, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
  })),
  on(updateAuthGrantSuccess, (state, { authGrant }) => ({
    ...state,
    authGrant,
    errorMessage: null,
    isLoading: false,
  })),
  on(updateAuthGrantFailure, (state, { error }) => ({
    ...state,
    authGrant: null,
    error: error?.message || 'Auth failed',
    isLoading: false,
  })),
);
