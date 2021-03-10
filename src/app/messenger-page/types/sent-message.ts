import { Answer } from './answer';
import { BaseMessage } from './base-message';

interface AnswerMessage extends BaseMessage<'Answer'> {
  answers: Record<Answer['id'], 1>;
  meta: Record<string, any>;
  /**
   * Id of the question, matching the corresponding QuestionMessage.
   */
  question_id: string;
}

export type SentMessage = AnswerMessage;
