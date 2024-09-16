import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Your backend API URL
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router, private toastService: ToastService) {
    // Restore token from local storage if available
    const token = localStorage.getItem('accessToken');
    this.tokenSubject.next(token);
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response?.role == 2) {
            localStorage.setItem('isAdmin', 'true');
          }
          this.storeToken(response.accessToken);
        }),
        catchError(this.handleError)
      );
  }

  register(fullName: string, email: string, phoneNumber: string, password: string): Observable<any> {
    const body = { fullName, email, phoneNumber, password };
    return this.http.post<any>(`${this.apiUrl}/users/signup`, body);
  }

  private storeToken(token: string) {
    localStorage.setItem('accessToken', token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }


  createStringTemplate(message: string): TemplateRef<any> {
    // Create a dynamic template based on the message string
    const template = document.createElement('div');
    template.innerHTML = message;
    return template as unknown as TemplateRef<any>;
  }

  private handleError(error: any): Observable<never> {
    // Handle errors here
    console.log(error.error.statusCode);



    this.toastService.show({ template: this.createStringTemplate(`${error.error.statusCode} ${error.error.message}`), classname: 'bg-danger text-light', delay: 5000 });
    console.log('An error occurred:', error.error);
    throw new Error('An error occurred');
  }
}
