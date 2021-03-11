import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { State as AuthState, reducer as authReducer } from './auth.reducer';
import {
  State as ConversationState,
  reducer as conversationReducer,
} from '../messenger-page';

export interface AppState {
  router: RouterState;

  auth: AuthState;
  conversation: ConversationState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,

  auth: authReducer,
  conversation: conversationReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
