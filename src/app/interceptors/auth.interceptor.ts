import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppService } from '../services/app.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(
    private appService: AppService,
    private notification: NotificationService
  ) {
    this.appService.isLogin$.subscribe((data) => (this.token = data));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders().set('Authorization', this.token),
    });
    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server response', event.body.message);
            if (event.body.message) {
              this.notification.openAlertBar(event.body.message);
            }
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) console.log('Unauthorized');
            if (err.status == 404) console.log('Not Found');
          }
        }
      )
    );
  }
}
