import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<object> {
    return this.http.post<object>(`${environment.urlApi}/api/login_check`, {
      'email': email,
      'password': password
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
  }

  registration(mail: string, plainPassword: string): Observable<object> {
    return this.http.post<object>(`${environment.urlApi}/api/users`, {
      'email': mail,
      'plainPassword': plainPassword
    })
  }

}
