import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConversationEffects } from './conversation.effects';

describe('ConversationEffects', () => {
  let actions$: Observable<any>;
  let effects: ConversationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConversationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ConversationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
