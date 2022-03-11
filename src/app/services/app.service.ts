import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { UserDialog } from '../models/user-dialog';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';

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

  isLogin$: BehaviorSubject<any> = new BehaviorSubject('');

  public getAuthentificated(): boolean {
    return this.isAuthentificated$.value;
  }

  private setAuthentificated(value: boolean): void {
    this.isAuthentificated$.next(value);
  }

  login(login: LoginRequest) {
    return this.http
      .post<LoginRequest>(environment.API_URL_LOGIN, login, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          this.notification.openAlertBar(err.error.message);
          this.errorMessage = err.message;
          console.log(err.message);
          return [];
        })
      )
      .subscribe((data) => {
        const authToken = data.headers.get('Authorization');
        this.isLogin$.next(authToken);
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
      .subscribe(() => console.log(`user id: ${id} is patched`));
  }
}
