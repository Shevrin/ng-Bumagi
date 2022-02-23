import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';
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

  getAuthentificated(): boolean {
    console.log(this.isAuthentificated$.value);
    return this.isAuthentificated$.value;
  }

  private setAuthentificated(value: boolean): void {
    this.isAuthentificated$.next(value);
  }

  // getUser(response: AuthResponse): AuthResponse {
  //   return response;
  // }

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
        // console.log(data);
        // console.log('body', data.body);
        // console.log(data.headers.keys());
        // console.log(data.headers.getAll('Authorization'));
        // console.log(data.headers.get('Authorization'));

        this.setAuthentificated(true);
        this.router.navigate(['/userslist']);
        // console.log(observe);
        // console.log(data.message);
        // if (data.message == 'ok') {
        //   // this.isLogin$.next({ message: data.message});
        // }
      });
  }

  getUsers(status: number) {
    const url = environment.API_URL_ALL_USERS_STATUS + status;
    return this.http.get(
      url
      // {
      //   headers: new HttpHeaders().set(
      //     'Authorization',
      //     'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
      //   ),
      // }
    );
    // .subscribe((data) => {
    //   console.log('getUsers', data);
    // });
  }

  getAllUsers() {
    return this.http.get(
      environment.API_URL_ALL_USERS
      // {
      //   headers: new HttpHeaders().set(
      //     'Authorization',
      //     'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
      //   ),
      //     }
    );
    // .pipe(map((data) => console.log(data)));
  }

  editUser(id: number, userForm: UserDialog) {
    console.log('userForm SERVICE ', userForm);

    const url = environment.API_URL_ALL_USERS + id;

    return this.http
      .patch(url, userForm, {
        // headers: new HttpHeaders().set(
        //   'Authorization',
        //   'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
        // ),
      })
      .subscribe((data) => console.log(data));
  }
}
