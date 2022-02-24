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
    console.log('============service OPEN=====LOADER============');
  }
  hideLoader(): void {
    this.isLoading$.next(false);
    console.log('============service CLOSE=====LOADER============');
  }
}
