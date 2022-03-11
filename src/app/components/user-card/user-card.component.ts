import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDialog } from 'src/app/models/user-dialog';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  public isOpen = false;
  public userForm!: FormGroup;
  public nameInHeader = this.userdata.fname + ' ' + this.userdata.name;

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userdata: UserDialog
  ) {}

  private initForm(): void {
    this.userForm = this.fb.group({
      name: [this.userdata.name, [Validators.minLength(1)]],
      mname: [this.userdata.mname, [Validators.minLength(1)]],
      fname: [this.userdata.fname, [Validators.minLength(1)]],
      status: [this.userdata.status.toString()],
    });
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  public onSubmit(): void {
    const controls = this.userForm.controls;
    if (this.userForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    } else {
      this.appService.editUser(this.userdata.id, this.userForm.value);
    }
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
