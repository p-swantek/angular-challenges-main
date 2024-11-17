import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, map, merge, Observable, of, retry, retryWhen, startWith, switchMap, take, takeUntil, tap, pipe } from 'rxjs';


@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button #btn
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="test | async" [max]="100"></progress>
      </div>
    </main>
  `,
  //  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('btn') button!: ElementRef<HTMLButtonElement>;



  display!: Observable<number>;
  increment!: Observable<number>;

  bs: BehaviorSubject<number> = new BehaviorSubject(0);
  value = 0;
  test!: Observable<number>;


  ngAfterViewInit(): void {

    const cancelEvents = merge(
      fromEvent(this.button.nativeElement, 'mouseup'),
      fromEvent(this.button.nativeElement, 'mouseleave')
    );


    const cancelValue = cancelEvents.pipe(
      map(() => 0)
    )


    this.increment = fromEvent(this.button.nativeElement, 'mousedown').pipe(
      switchMap(() => interval(100).pipe(
        takeUntil(cancelEvents)
      )),
    )

    this.test = merge(this.increment, cancelValue)

  }



  onSend() {
    console.log('Save it!');
  }
}
