import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { State as ConversationState } from './conversation.reducer';

const selectConversationState = createFeatureSelector<
  AppState,
  ConversationState
>('conversation');

export const selectMessages = createSelector(
  selectConversationState,
  (state) => state.messages,
);

export const selectIsDone = createSelector(
  selectConversationState,
  (state) => state.isDone,
);
