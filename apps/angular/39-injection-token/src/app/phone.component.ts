import { Component } from '@angular/core';
import { TimerContainerComponent } from './timer-container.component';
import { TIMER_VALUE } from './data';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
  providers: [{
    provide: TIMER_VALUE,
    useValue: 2000
  }]
})
export default class PhoneComponent {}
