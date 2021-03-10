import { createAction, props } from '@ngrx/store';
import { ReceivedMessage, SentMessage } from '../types';

export const beginConversation = createAction(
  '[Conversation] Begin Conversation',
);

export const addMessage = createAction(
  '[Conversation] Add Message',
  props<{ message: ReceivedMessage }>(),
);

export const addMessageFailure = createAction(
  '[Conversation] Add Message Failure',
  props<{ error: any }>(),
);

export const goodBye = createAction('[Conversation] Good Bye');

export const sendMessage = createAction(
  '[Conversation] Send Message',
  props<{ message: SentMessage }>(),
);
