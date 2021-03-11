import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  routerNavigatedAction,
  routerNavigationAction,
  routerReducer,
} from '@ngrx/router-store';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { payload as routerNavigatedActionPayload } from './fixtures/router-navigated-action';
import { updateAuthGrant } from './auth.actions';
import { AppState } from '.';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let store: MockStore<Partial<AppState>>;
  let testScheduler: TestScheduler;

  const routeId = 'abc123';
  const initialState = {
    router: routerReducer(
      undefined,
      routerNavigationAction({
        payload: routerNavigatedActionPayload(routeId) as any,
      }),
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffects,
        provideMockStore<Partial<AppState>>({
          initialState,
        }),
        provideMockActions(() => actions$),
      ],
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(AuthEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should call updateAuthGrant action when navigating to /m/:id', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const navigatedAction = routerNavigatedAction({
        payload: routerNavigatedActionPayload(routeId),
      });
      store.setState({
        router: routerReducer(initialState.router, navigatedAction),
      });
      actions$ = hot('(a-)', {
        a: navigatedAction,
      });

      expectObservable(effects.startUpdateAuthGrant$).toBe('(-b)', {
        b: updateAuthGrant({ id: routeId }),
      });
    });
  });
});
