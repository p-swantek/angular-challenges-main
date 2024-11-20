import { InjectionToken } from "@angular/core";

export const DEFAULT_TIMER = 1000;

export const TIMER_VALUE: InjectionToken<number> = new InjectionToken('timer value to use');
