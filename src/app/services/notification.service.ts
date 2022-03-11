import { Injectable } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { ModalAlertComponent } from '../components/modal-alert/modal-alert.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  durationInSeconds = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _alertBar: MatSnackBar) {}

  public openAlertBar(message: string) {
    this._alertBar.openFromComponent(ModalAlertComponent, {
      data: {
        message: message,
      },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
