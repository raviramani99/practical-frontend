import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../user/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.token$.pipe(
            take(1),
            map(token => !!token),
            tap(isAuthenticated => {
                if (!isAuthenticated) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
