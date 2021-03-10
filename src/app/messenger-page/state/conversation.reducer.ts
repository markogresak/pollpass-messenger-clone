import { createReducer, on } from '@ngrx/store';
import { ReceivedMessage } from '../types';
import { isHeartbeatMessage, isHistoryMessage } from '../types/guards';
import { goodBye, addMessage, addHistory } from './conversation.actions';

export const conversationFeatureKey = 'conversation';

export interface State {
  messages: ReceivedMessage[];
  isDone: boolean;
}

export const initialState: State = {
  messages: [],
  isDone: false,
};

export const reducer = createReducer(
  initialState,
  on(addHistory, (state, { message }) => ({
    ...state,
    messages: message.messages,
  })),
  on(addMessage, (state, { message }) => {
    if (isHeartbeatMessage(message)) {
      // Do not store heartbeat messages for testing case.
      return state;
    }

    return {
      ...state,
      messages: [...state.messages, message],
    };
  }),
  on(goodBye, (state) => ({
    ...state,
    isDone: true,
  })),
);
