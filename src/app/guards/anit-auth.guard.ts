import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../user/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AntiAuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('accessToken')) {
            if (localStorage.getItem('isAdmin')) {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/']);
            }
            return false
        }
        else {
            return true
        }
    }
}
