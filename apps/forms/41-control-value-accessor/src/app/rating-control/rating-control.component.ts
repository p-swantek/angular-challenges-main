import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true
    }
  ]
})
export class RatingControlComponent implements ControlValueAccessor {
  private value: number | null = null;
  private onTouched!: () => void;
  private onChanged!: (val: number) => void;

  setRating(index: number): void {
    this.onTouched();
    this.value = index + 1;
    this.onChanged(this.value);
  }

  isStarActive(index: number): boolean {
    return this.value ? index < this.value : false;
  }

  writeValue(obj: number): void {
    if (obj === null){
      this.value = 0;
    }
    else if (obj >= 1 && obj <= 5){
      this.value = obj;
    }
  }
  registerOnChange(fn: (val: number) => void): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
