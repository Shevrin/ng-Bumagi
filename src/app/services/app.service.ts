import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { UserDialog } from '../models/user-dialog';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

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
    // console.log(login);
    const url = environment.urlApi + '/auth';
    this.http
      .post<LoginRequest>(
        url,
        {
          login: 'test@example.com',
          password: '1q2w3e',
        },
        { observe: 'response' }
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          console.log(err.message);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);
        console.log('body', data.body);
        console.log(data.headers.keys());
        console.log(data.headers.getAll('Authorization'));
        console.log(data.headers.get('Authorization'));
        // console.log(observe);
        // console.log(data.message);
        // if (data.message == 'ok') {
        //   this.setAuthentificated(true);
        //   // this.isLogin$.next({ message: data.message});
        // }
      });
  }

  getUsers(status: number) {
    const url =
      'https://bumagi-frontend-test.herokuapp.com/users' + `?status=${status}`;

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'Authorization',
        'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
      ),
    });
    // .subscribe((data) => {
    //   console.log('getUsers', data);
    // });
  }
  getAllUsers() {
    const url = 'https://bumagi-frontend-test.herokuapp.com/users';

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'Authorization',
        'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
      ),
    });
  }

  editUser(id: number, userForm: UserDialog) {
    console.log('userForm SERVICE ', userForm);

    const url = 'https://bumagi-frontend-test.herokuapp.com/users/' + 14;

    // return this.http.patch(
    //   url,
    //   {
    //     name: 'PATCH_Тимур',
    //     fname: 'румиТ',
    //     mname: 'Геннадьевич',
    //     status: 2,
    //   },
    //   {
    //     headers: new HttpHeaders().set(
    //       'Authorization',
    //       'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
    //     ),
    //   }
    // );
  }
}
