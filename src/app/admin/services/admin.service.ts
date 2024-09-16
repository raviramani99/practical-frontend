import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin';
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Authorization header
  });

  constructor(private http: HttpClient) { }

  // Fetch all users
  getUsers(searchCriteria?: any): Observable<any> {
    let params = new HttpParams();
    if (searchCriteria?.search) {
      params = params.append('search', searchCriteria.search);
    }
    if (searchCriteria?.startDate) {
      params = params.append('startDate', searchCriteria.startDate);
    }
    if (searchCriteria?.endDate) {
      params = params.append('endDate', searchCriteria.endDate);
    }
    return this.http.get<any>(`${this.apiUrl}/users`, { headers: this.headers, params: params });
  }

  // Update user active/deactive status
  toggleUserStatus(userId: string, isActive: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, { isActive }, { headers: this.headers });
  }

  getAllProducts(searchCriteria?: any): Observable<any[]> {
    let params = new HttpParams();
    if (searchCriteria?.search) {
      params = params.append('search', searchCriteria.search);
    }
    if (searchCriteria?.startDate) {
      params = params.append('startDate', searchCriteria.startDate);
    }
    if (searchCriteria?.endDate) {
      params = params.append('endDate', searchCriteria.endDate);
    }
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers: this.headers, params: params });
  }

}
