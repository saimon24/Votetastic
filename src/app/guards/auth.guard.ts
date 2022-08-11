import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { CurrentUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getCurrentUser().pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated: CurrentUser) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
