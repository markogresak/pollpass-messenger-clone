import {
  AnswerViewMessage,
  HeartbeatMessage,
  HistoryMessage,
  QuestionMessage,
  ReceivedMessage,
  StatementMessage,
} from '../received-message';

export const isAnswerViewMessage = (value: any): value is AnswerViewMessage =>
  value?.kind === 'AnswerView';

export const isHeartbeatMessage = (value: any): value is HeartbeatMessage =>
  value?.kind === 'Heartbeat';

export const isHistoryMessage = (value: any): value is HistoryMessage =>
  value?.kind === 'History';

export const isQuestionMessage = (value: any): value is QuestionMessage =>
  value?.kind === 'Question';

export const isStatementMessage = (value: any): value is StatementMessage =>
  value?.kind === 'Statement';

export const isReceivedMessage = (value: any): value is ReceivedMessage =>
  isAnswerViewMessage(value) ||
  isHeartbeatMessage(value) ||
  isHistoryMessage(value) ||
  isQuestionMessage(value) ||
  isStatementMessage(value);
