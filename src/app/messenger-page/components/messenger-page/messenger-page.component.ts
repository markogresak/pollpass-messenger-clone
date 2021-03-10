import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state';
import { updateAuthGrant } from 'src/app/state/auth.actions';
import { createAnswerMessage } from '../../lib';
import { sendMessage } from '../../state/conversation.actions';
import {
  selectActiveQuestionId,
  selectIsDone,
  selectMessages,
} from '../../state/conversation.selectors';
import { QuestionMessage, ReceivedMessage, SentAnswer } from '../../types';
import { isQuestionMessage, isStatementMessage } from '../../types/guards';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss'],
})
export class MessengerPageComponent implements OnInit {
  isQuestionMessage = isQuestionMessage;
  isStatementMessage = isStatementMessage;

  messages$: Observable<ReceivedMessage[]> = this.store.select(selectMessages);
  activeQuestionId$: Observable<string | null> = this.store.select(
    selectActiveQuestionId,
  );
  isDone$: Observable<boolean> = this.store.select(selectIsDone);

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    const id = this.getRouteId();

    if (id) {
      this.store.dispatch(updateAuthGrant({ id }));
    }
  }

  submitAnswers(message: QuestionMessage, answers: SentAnswer) {
    this.store.dispatch(
      sendMessage({
        message: createAnswerMessage(message.question_id, answers),
      }),
    );
  }

  getText(message: any): string {
    // HACK: this is temporary testing code
    return message.text_html || message.name_html;
  }

  private getRouteId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
