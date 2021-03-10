import { Answer } from './answer';
import { BaseMessage } from './base-message';

export type SentAnswer = Record<Answer['id'], 1>;

export interface AnswerMessage extends BaseMessage<'Answer'> {
  answers: SentAnswer;
  meta: Record<string, any>;
  /**
   * Id of the question, matching the corresponding QuestionMessage.
   */
  question_id: string;
}

export type SentMessage = AnswerMessage;
