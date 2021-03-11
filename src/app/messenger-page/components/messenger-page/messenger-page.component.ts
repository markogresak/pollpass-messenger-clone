import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state';
import { createAnswerMessage } from '../../lib';
import { sendMessage } from '../../state/conversation.actions';
import {
  selectActiveQuestionId,
  selectIsDone,
  selectMessages,
} from '../../state/conversation.selectors';
import {
  AnswerViewMessage,
  QuestionMessage,
  ReceivedMessage,
  SentAnswer,
} from '../../types';
import {
  isQuestionMessage,
  isStatementMessage,
  isAnswerViewMessage,
} from '../../types/guards';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss'],
})
export class MessengerPageComponent {
  isAnswerViewMessage = isAnswerViewMessage;
  isQuestionMessage = isQuestionMessage;
  isStatementMessage = isStatementMessage;

  messages$: Observable<ReceivedMessage[]> = this.store.select(selectMessages);
  activeQuestionId$: Observable<string | null> = this.store.select(
    selectActiveQuestionId,
  );
  isDone$: Observable<boolean> = this.store.select(selectIsDone);

  constructor(private store: Store<AppState>) {}

  submitAnswers(message: QuestionMessage, answers: SentAnswer) {
    this.store.dispatch(
      sendMessage({
        message: createAnswerMessage(message.question_id, answers),
      }),
    );
  }

  getAnswerHtml(message: AnswerViewMessage): string {
    return message.answers.map((answer) => answer.text_html).join('');
  }
}
