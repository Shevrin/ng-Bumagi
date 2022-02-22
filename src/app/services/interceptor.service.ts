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
import { AppService } from './app.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  constructor(
    private appService: AppService,
    private notification: NotificationService
  ) {}
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   req = req.clone({
  //     setHeaders: { Authtorisation: 'token 7c217d7b1444ee1a3d6b81ff1f0b50eb' },
  //   });
  //   return next.handle(req);
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
      ),
      // headers: req.headers.set(
      //   'Authorization',
      //   'token 7c217d7b1444ee1a3d6b81ff1f0b50eb'
      // ),
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
