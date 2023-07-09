import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }


  getUserInfos(id: string): Observable<object> {
    return this.http.get<object>(`${environment.urlApi}/api/users/${id}`);
  }

  createExcelInfos(name: string, data: Array<any>, colDef: Array<any>): Observable<object> {
    return this.http.post<object>(`${environment.urlApi}/api/excel_datas`, {
      'name': name,
      'data': data,
      'fields': colDef
    });
  }

  getExcelInfos(id: string): Observable<object> {
    return this.http.get<object>(`${environment.urlApi}/api/excel_datas/${id}`);
  }

  updateExcelInfos(id: string, data: Array<any>): Observable<object> {
    return this.http.patch<object>(`${environment.urlApi}/api/excel_datas/${id}`, {
      data: data
    });
  }

  deleteExcelInfos(id: string): Observable<object> {
    return this.http.delete<object>(`${environment.urlApi}/api/excel_datas/${id}`);
  }

}
