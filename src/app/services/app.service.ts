import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { UserDialog } from '../models/user-dialog';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private notification: NotificationService,
    private router: Router
  ) {}

  isAuthentificated$: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );

  isLogin$: BehaviorSubject<LoginResponse> = new BehaviorSubject(
    {} as LoginResponse
  );

  public getAuthentificated(): boolean {
    return this.isAuthentificated$.value;
  }

  private setAuthentificated(value: boolean): void {
    this.isAuthentificated$.next(value);
  }

  login(login: LoginRequest) {
    this.http
      .post<LoginRequest>(
        environment.API_URL_LOGIN,
        {
          login: 'test@example.com',
          password: '1q2w3e',
        },
        { observe: 'response' }
      )
      .pipe(
        catchError((err) => {
          console.log(err.error.message);
          this.notification.openAlertBar(err.error.message);
          this.errorMessage = err.message;
          console.log(err.message);
          return [];
        })
      )
      .subscribe((data) => {
        this.setAuthentificated(true);
        this.router.navigate(['/userslist']);
      });
  }

  getUsers(status: number) {
    const url = environment.API_URL_ALL_USERS_STATUS + status;
    return this.http.get(url);
  }

  getAllUsers() {
    return this.http.get(environment.API_URL_ALL_USERS);
  }

  editUser(id: number, userForm: UserDialog) {
    const url = environment.API_URL_ALL_USERS + id;
    return this.http
      .patch(url, userForm)
      .subscribe((data) => console.log(data));
  }
}
