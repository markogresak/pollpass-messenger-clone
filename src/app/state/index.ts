import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State as AuthState, reducer as authReducer } from './auth.reducer';
import {
  State as ConversationState,
  reducer as conversationReducer,
} from '../messenger-page';

export interface AppState {
  auth: AuthState;
  conversation: ConversationState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  conversation: conversationReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
