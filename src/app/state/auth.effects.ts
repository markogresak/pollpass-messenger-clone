import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { AuthGrant } from '../types';
import {
  updateAuthGrant,
  updateAuthGrantFailure,
  updateAuthGrantSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private static readonly AUTH_GRANT_KEY = 'authGrant';

  updateAuthGrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAuthGrant),
      exhaustMap((action) =>
        this.getAuthGrant(action.id).pipe(
          map((authGrant) => updateAuthGrantSuccess({ authGrant })),
          catchError((error) => of(updateAuthGrantFailure({ error }))),
        ),
      ),
    ),
  );

  updateAuthGrantSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAuthGrantSuccess),
        exhaustMap((action) => {
          this.storage.set(AuthEffects.AUTH_GRANT_KEY, action.authGrant);
          return of(undefined);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private storage: StorageService<AuthGrant>,
  ) {}

  private getAuthGrant(id: string): Observable<AuthGrant> {
    const storedAuthGrant = this.storage.get(AuthEffects.AUTH_GRANT_KEY);
    if (storedAuthGrant && this.auth.isValidAuthGrant(storedAuthGrant)) {
      return of(storedAuthGrant);
    }
    return this.auth.createMagicLink(id);
  }
}
