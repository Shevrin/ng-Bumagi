import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );

  public showLoader(): void {
    this.isLoading$.next(true);
  }
  public hideLoader(): void {
    this.isLoading$.next(false);
  }
}
