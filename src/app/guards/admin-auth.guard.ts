import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('accessToken') || localStorage.getItem('isAdmin')) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false
        }
    }
}
