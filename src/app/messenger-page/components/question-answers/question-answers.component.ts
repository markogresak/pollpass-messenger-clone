import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { createRadioQuestionAnswer } from '../../lib';
import { createMultipleQuestionAnswer } from '../../lib/createMultipleQuestionAnswer';
import { QuestionMessage, SentAnswer } from '../../types';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss'],
})
export class QuestionAnswersComponent implements OnInit {
  @Input() message: QuestionMessage;
  @Output() onSubmit = new EventEmitter<SentAnswer>();

  answersForm = this.formBuilder.group({
    multipleAnswers: new FormArray([]),
    radioAnswer: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const multipleAnswersControl = this.answersForm.get(
      'multipleAnswers',
    ) as FormArray;

    this.message.question_options.forEach(() => {
      multipleAnswersControl.push(new FormControl(false));
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (!this.answersForm.valid) {
      return;
    }

    if (this.isRadioQuestion) {
      this.onSubmit.emit(
        createRadioQuestionAnswer(this.answersForm.value.radioAnswer),
      );
    }

    if (this.isMultipleQuestion) {
      this.onSubmit.emit(
        createMultipleQuestionAnswer(
          this.answersForm.value.multipleAnswers,
          this.message.question_options,
        ),
      );
    }
  }

  get isRadioQuestion(): boolean {
    return this.message.question_type === 'RadioQuestion';
  }

  get isMultipleQuestion(): boolean {
    return this.message.question_type === 'MultipleQuestion';
  }
}
