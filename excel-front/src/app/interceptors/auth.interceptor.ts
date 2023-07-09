import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem('token');
    if (token) {
        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        });
    } else {
      request = request.clone({
        setHeaders: {
            'Content-type':'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
