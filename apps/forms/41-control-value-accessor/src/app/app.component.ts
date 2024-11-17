import { Component } from '@angular/core';
import { FeedbackFormComponent, FormModel } from './feedback-form/feedback-form.component';

@Component({
  standalone: true,
  imports: [FeedbackFormComponent],
  selector: 'app-root',
  template: `
    <app-feedback-form (feedBackSubmit)="apiCall($event)"></app-feedback-form>
  `,
})
export class AppComponent {
  apiCall(event: Partial<FormModel>): void {
    console.log(event);
  }
}
