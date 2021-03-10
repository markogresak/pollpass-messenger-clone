import { Question, SentAnswer } from '../types';

export const createMultipleQuestionAnswer = (
  answerSelection: boolean[],
  questionOptions: Question[],
): SentAnswer => {
  const answerIds = questionOptions.map(({ id }) => id);
  const selectedIds = answerSelection
    .map((isSelected, i) => isSelected && answerIds[i])
    .filter((value): value is string => typeof value === 'string');

  return Object.fromEntries(selectedIds.map((id) => [id, 1]));
};
