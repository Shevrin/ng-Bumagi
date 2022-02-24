import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);

  showLoader(): void {
    this.isLoading$.next(true);
  }
  hideLoader(): void {
    this.isLoading$.next(false);
  }
}
