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
import { Observable, of } from 'rxjs';

import { AuthService } from '../auth.service';
import { mockAuthGrant } from '../fixtures/mockAuthGrant';
import { StorageService } from '../storage.service';
import { AuthGrant } from '../types';
import { AuthEffects } from './auth.effects';
import { payload as routerNavigatedActionPayload } from './fixtures/router-navigated-action';
import { updateAuthGrant, updateAuthGrantSuccess } from './auth.actions';
import { AppState } from '.';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let store: MockStore<Partial<AppState>>;
  let testScheduler: TestScheduler;
  let authService: jasmine.SpyObj<AuthService>;
  let storageService: jasmine.SpyObj<StorageService<AuthGrant>>;

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
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'createMagicLink',
    ]);
    authServiceSpy.createMagicLink.and.returnValue(of(mockAuthGrant));

    const storageServiceSpy = jasmine.createSpyObj<StorageService<AuthGrant>>(
      'StorageService',
      ['get', 'set', 'remove'],
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        AuthEffects,
        provideMockStore<Partial<AppState>>({
          initialState,
        }),
        provideMockActions(() => actions$),
      ],
    });

    store = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService) as typeof authServiceSpy;
    storageService = TestBed.inject(StorageService) as typeof storageServiceSpy;
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

  it('should call updateAuthGrantSuccess action after receiving updateAuthGrant', () => {
    testScheduler.run(({ hot, expectObservable, flush }) => {
      actions$ = hot('(a-)', {
        a: updateAuthGrant({ id: routeId }),
      });

      expectObservable(effects.updateAuthGrant$).toBe('(-b)', {
        b: updateAuthGrantSuccess({ authGrant: mockAuthGrant }),
      });
      flush();
      expect(authService.createMagicLink).toHaveBeenCalledOnceWith(routeId);
    });
  });

  it('should use stored authGrant instead of calling createMagicLink', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const storedAuthGrant: AuthGrant = {
        ...mockAuthGrant,
        access_token: 'stored-access-token',
        created_at: Math.floor(Date.now() / 1000),
      };
      storageService.get.and.returnValue(storedAuthGrant);

      actions$ = hot('(a-)', {
        a: updateAuthGrant({ id: routeId }),
      });

      expectObservable(effects.updateAuthGrant$).toBe('(-b)', {
        b: updateAuthGrantSuccess({ authGrant: storedAuthGrant }),
      });
    });
  });
});
