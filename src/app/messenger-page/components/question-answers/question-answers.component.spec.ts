import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { QuestionAnswersComponent } from './question-answers.component';

describe('QuestionAnswersComponent', () => {
  let component: QuestionAnswersComponent;
  let fixture: ComponentFixture<QuestionAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionAnswersComponent],
      imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        ReactiveFormsModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswersComponent);
    component = fixture.componentInstance;
    component.message = {
      created_at: new Date().toISOString(),
      id: 'abc',
      kind: 'Question',
      name_html: '<p>Name</p>',
      question_id: 'a-1-2',
      question_options: [],
      question_type: 'RadioQuestion',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
