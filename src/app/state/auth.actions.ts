import { createAction, props } from '@ngrx/store';
import { AuthGrant } from '../types';

export const updateAuthGrant = createAction(
  '[Auth] Update Auth Grant',
  props<{ id: string }>(),
);

export const updateAuthGrantSuccess = createAction(
  '[Auth] Update Auth Grant Success',
  props<{ authGrant: AuthGrant }>(),
);

export const updateAuthGrantFailure = createAction(
  '[Auth] Update Auth Grant Failure',
  props<{ error: any }>(),
);
