import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { UserDialog } from '../models/user-dialog';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  errorMessage!: string;
  authToken!: string | null;

  constructor(
    private http: HttpClient,
    private notification: NotificationService,
    private router: Router
  ) {}

  private isAuthentificated$: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );

  private isLogin$: BehaviorSubject<string> = new BehaviorSubject('');

  public getAuthentificated(): boolean {
    return this.isAuthentificated$.value;
  }

  public getIsLogin(): Observable<string> {
    return this.isLogin$.asObservable();
  }

  private setAuthentificated(value: boolean): void {
    this.isAuthentificated$.next(value);
  }

  private setIsLogin(value: string): void {
    this.isLogin$.next(value);
  }

  public login(login: LoginRequest) {
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
        this.authToken = data.headers.get('Authorization');
        if (this.authToken) {
          this.setIsLogin(this.authToken);
        }
        this.setAuthentificated(true);
        this.router.navigate(['/userslist']);
      });
  }

  public getUsers(status: number) {
    const url = environment.API_URL_ALL_USERS_STATUS + status;
    return this.http.get(url);
  }

  public getAllUsers() {
    return this.http.get(environment.API_URL_ALL_USERS);
  }

  public editUser(id: number, userForm: UserDialog) {
    const url = environment.API_URL_ALL_USERS + id;
    return this.http
      .patch(url, userForm)
      .subscribe(() => console.log(`user id: ${id} is patched`));
  }
}
