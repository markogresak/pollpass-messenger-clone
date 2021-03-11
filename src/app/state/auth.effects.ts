import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, filter, map } from 'rxjs/operators';
import { AppState } from '.';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { AuthGrant } from '../types';
import {
  updateAuthGrant,
  updateAuthGrantFailure,
  updateAuthGrantSuccess,
} from './auth.actions';
import { selectCurrentRoute } from './router.selectors';

@Injectable()
export class AuthEffects {
  private static readonly AUTH_GRANT_KEY = 'authGrant';

  startUpdateAuthGrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() => this.store.select(selectCurrentRoute)),
      filter(
        ([, { routeConfig, params }]) =>
          routeConfig.path === 'm/:id' && typeof params.id === 'string',
      ),
      map(([, { params }]) => updateAuthGrant({ id: params.id })),
    ),
  );

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
    private store: Store<AppState>,
  ) {}

  private getAuthGrant(id: string): Observable<AuthGrant> {
    const storedAuthGrant = this.storage.get(AuthEffects.AUTH_GRANT_KEY);
    if (storedAuthGrant && this.auth.isValidAuthGrant(storedAuthGrant)) {
      return of(storedAuthGrant);
    }
    return this.auth.createMagicLink(id);
  }
}
