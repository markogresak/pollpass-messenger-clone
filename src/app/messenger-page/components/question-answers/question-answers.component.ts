import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionMessage } from '../../types';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss'],
})
export class QuestionAnswersComponent {
  @Input() message: QuestionMessage;

  answersForm = this.formBuilder.group({
    options: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    console.log('value', this.answersForm.value);
  }

  get isRadioQuestion(): boolean {
    return this.message.question_type === 'RadioQuestion';
  }
}
