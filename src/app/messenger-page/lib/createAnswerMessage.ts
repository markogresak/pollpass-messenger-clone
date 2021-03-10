import { v4 as uuidV4 } from 'uuid';
import { AnswerMessage, SentAnswer } from '../types';

export const createAnswerMessage = (
  questionId: AnswerMessage['question_id'],
  answers: SentAnswer,
): AnswerMessage => ({
  answers,
  created_at: new Date().toISOString(),
  id: uuidV4(),
  kind: 'Answer',
  question_id: questionId,
  meta: getMetadata(),
});

const getMetadata = () => ({
  quick: false, // TODO: hardcoded for testing purposes
  direct: false, // TODO: hardcoded for testing purposes
  indecisive: false, // TODO: hardcoded for testing purposes
  shown_at: Date.now(), // TODO: hardcoded for testing purposes
  answered_at: Date.now(),
  screen_resolution_width: window.innerWidth * window.devicePixelRatio,
  screen_resolution_height: window.innerHeight * window.devicePixelRatio,
  device_pixel_ratio: window.devicePixelRatio,
  window_resolution_width: window.innerWidth,
  window_resolution_height: window.innerHeight,
});
