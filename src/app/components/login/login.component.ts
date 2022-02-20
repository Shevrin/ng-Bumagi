import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  userList!: Observable<any>;
  isactive!: any;
  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    this.initForm();
    this.isactive = this.appService.isAuthentificated$;
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(): void {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    } else {
      this.appService.login(this.loginForm.value);
      // this.loginForm.reset();
    }
  }
}
