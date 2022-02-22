import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public alertRef: MatSnackBarRef<ModalAlertComponent>
  ) {}

  ngOnInit(): void {}
}
