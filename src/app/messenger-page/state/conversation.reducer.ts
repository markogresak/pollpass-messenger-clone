import { Action, createReducer, on } from '@ngrx/store';
import { ReceivedMessage } from '../types';
import { isHeartbeatMessage, isHistoryMessage } from '../types/guards';
import { addMessage } from './conversation.actions';

export const conversationFeatureKey = 'conversation';

export interface State {
  messages: ReceivedMessage[];
}

export const initialState: State = {
  messages: [],
};

export const reducer = createReducer(
  initialState,
  on(addMessage, (state, { message }) => {
    if (isHistoryMessage(message)) {
      return {
        ...state,
        messages: message.messages,
      };
    }

    if (isHeartbeatMessage(message)) {
      // We do not want to store heartbeat messages.
      return state;
    }

    return {
      ...state,
      messages: [...state.messages, message],
    };
  }),
);
