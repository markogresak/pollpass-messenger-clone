import { Answer } from './answer';
import { BaseMessage } from './base-message';
import { Question } from './question';

export interface StatementMessage extends BaseMessage<'Statement'> {
  text_html: string;
}

export interface QuestionMessage extends BaseMessage<'Question'> {
  /**
   * Title of the question.
   */
  name_html: string;
  question_id: string;
  question_options: Question[];
  question_type: 'RadioQuestion' | 'MultipleQuestion' | string; // TODO: be more specific
}

export interface AnswerViewMessage extends BaseMessage<'AnswerView'> {
  answers: Answer[];
  /**
   * Id of the question, matching the corresponding QuestionMessage.
   */
  question_id: string;
}

export interface HeartbeatMessage extends BaseMessage<'Heartbeat'> {}

export interface HistoryMessage extends BaseMessage<'History'> {
  messages: (AnswerViewMessage | QuestionMessage | StatementMessage)[];
  /**
   * Number of messages.
   */
  size: number;
}

export type ReceivedMessage =
  | AnswerViewMessage
  | HeartbeatMessage
  | HistoryMessage
  | QuestionMessage
  | StatementMessage;
