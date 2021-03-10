import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { updateAuthGrantSuccess } from 'src/app/state/auth.actions';
import {
  addMessage,
  addMessageFailure,
  sendMessage,
} from './conversation.actions';
import { ConversationService } from './conversation.service';

@Injectable()
export class ConversationEffects {
  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAuthGrantSuccess),
      exhaustMap(({ authGrant }) =>
        this.conversation
          .connect(authGrant.access_token)
          .pipe(map((message) => addMessage({ message }))),
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

  constructor(
    private actions$: Actions,
    private conversation: ConversationService,
  ) {}
}
