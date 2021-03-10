import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionMessage, SentAnswer } from '../../types';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss'],
})
export class QuestionAnswersComponent {
  @Input() message: QuestionMessage;
  @Output() onSubmit = new EventEmitter<SentAnswer>();

  answersForm = this.formBuilder.group({
    answers: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  handleSubmit() {
    const { answers } = this.answersForm.value;

    this.onSubmit.emit({
      [answers]: 1,
    });
  }

  get isRadioQuestion(): boolean {
    return this.message.question_type === 'RadioQuestion';
  }
}
