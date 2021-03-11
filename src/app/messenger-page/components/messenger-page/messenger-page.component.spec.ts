import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { MessengerPageComponent } from './messenger-page.component';
import { AppState } from 'src/app/state';

describe('MessengerPageComponent', () => {
  let component: MessengerPageComponent;
  let store: MockStore;
  let fixture: ComponentFixture<MessengerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessengerPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideMockStore<Partial<AppState>>({
          initialState: {
            conversation: {
              messages: [],
              activeQuestionId: null,
              isDone: false,
            },
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
