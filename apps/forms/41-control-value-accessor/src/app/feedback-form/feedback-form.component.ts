import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingControlComponent } from '../rating-control/rating-control.component';

export interface FormModel{
  name: string | null;
  email: string | null;
  comment: string | null;
  rating: number | null;
}

@Component({
  standalone: true,
  imports: [RatingControlComponent, ReactiveFormsModule],
  selector: 'app-feedback-form',
  templateUrl: 'feedback-form.component.html',
  styleUrls: ['feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @Output()
  readonly feedBackSubmit: EventEmitter<Partial<FormModel>> =
    new EventEmitter<Partial<FormModel>>();

  readonly feedbackForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: Validators.required,
    }),
    comment: new FormControl(''),
    rating: new FormControl(null, {
      validators: Validators.required,
    })
  });

  submitForm(): void {
    this.feedBackSubmit.emit({
      ...this.feedbackForm.value,
    });

    this.feedbackForm.reset();
  }
}
