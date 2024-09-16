import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  accessToken = localStorage.getItem('accessToken');
  constructor(private http: HttpClient) {
  }

  getProducts(searchCriteria?: any): Observable<any[]> {
    let params = new HttpParams();
    const headers = { 'Authorization': 'Bearer ' + this.accessToken };

    if (searchCriteria?.search) {
      params = params.append('search', searchCriteria.search);
    }
    if (searchCriteria?.startDate) {
      params = params.append('startDate', searchCriteria.startDate);
    }
    if (searchCriteria?.endDate) {
      params = params.append('endDate', searchCriteria.endDate);
    }

    return this.http.get<any[]>(this.apiUrl, { headers: headers, params: params });
  }

  deleteProduct(id: string): Observable<void> {
    const headers = { 'Authorization': 'Bearer ' + this.accessToken };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: headers });
  }

  addProduct(productData: FormData): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.accessToken };
    return this.http.post<any>(`${this.apiUrl}/create`, productData, { headers: headers });
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.accessToken };
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers: headers });
  }
}
