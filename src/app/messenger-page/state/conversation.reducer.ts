import { createReducer, on } from '@ngrx/store';
import { QuestionMessage, ReceivedMessage } from '../types';
import {
  isHeartbeatMessage,
  isHistoryMessage,
  isQuestionMessage,
} from '../types/guards';
import { goodBye, addMessage, addHistory } from './conversation.actions';

export const conversationFeatureKey = 'conversation';

export interface State {
  activeQuestionId: string | null;
  isDone: boolean;
  messages: ReceivedMessage[];
}

export const initialState: State = {
  activeQuestionId: null,
  messages: [],
  isDone: false,
};

export const reducer = createReducer(
  initialState,
  on(addHistory, (state, { message }) => ({
    ...state,
    activeQuestionId: getActiveQuestionId(message.messages),
    messages: message.messages,
  })),
  on(addMessage, (state, { message }) => {
    if (isHeartbeatMessage(message)) {
      // Do not store heartbeat messages for testing case.
      return state;
    }

    const messages = [...state.messages, message];

    return {
      ...state,
      activeQuestionId: getActiveQuestionId(messages),
      messages,
    };
  }),
  on(goodBye, (state) => ({
    ...state,
    isDone: true,
  })),
);

const getActiveQuestionId = (messages: ReceivedMessage[]): string | null => {
  const lastMessage = messages[messages.length - 1];
  if (isQuestionMessage(lastMessage)) {
    return lastMessage.question_id;
  }
  return null;
};
