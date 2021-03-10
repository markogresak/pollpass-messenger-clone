import { Answer, SentAnswer } from '../types';

export const createRadioQuestionAnswer = (
  answerId: Answer['id'],
): SentAnswer => ({
  [answerId]: 1,
});
