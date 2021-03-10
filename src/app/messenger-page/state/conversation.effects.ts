import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { updateAuthGrantSuccess } from 'src/app/state/auth.actions';
import {
  isGoodByeMessage,
  isHistoryMessage,
} from '../types/guards/is-received-message';
import {
  goodBye,
  addMessage,
  addMessageFailure,
  sendMessage,
  addHistory,
} from './conversation.actions';
import { ConversationService } from './conversation.service';

@Injectable()
export class ConversationEffects {
  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAuthGrantSuccess),
      exhaustMap(({ authGrant }) =>
        this.conversation.connect(authGrant.access_token).pipe(
          map((message) => {
            if (isHistoryMessage(message)) {
              return addHistory({ message });
            }
            if (isGoodByeMessage(message)) {
              return goodBye();
            }
            return addMessage({ message });
          }),
          catchError((error) => of(addMessageFailure({ error }))),
        ),
      ),
    ),
  );

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessage),
        exhaustMap(({ message }) => {
          this.conversation.send(message);
          return of(undefined);
        }),
      ),
    { dispatch: false },
  );

  goodBye$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(goodBye),
        exhaustMap(() => {
          this.conversation.close();
          return of(undefined);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private conversation: ConversationService,
  ) {}
}
