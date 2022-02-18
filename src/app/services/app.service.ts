import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponse): AuthResponse {
    return response;
  }

  login(login: LoginRequest) {
    console.log(login);

    const url = environment.urlApi + '/auth';
    this.http.post<LoginRequest>(url, login).subscribe((data) => {
      console.log(data);
    });
  }
}
