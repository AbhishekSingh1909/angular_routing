import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';

//to protect child routes I create a injectable function
export const authGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return gaurd(route, state);
};
const gaurd: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> | Observable<boolean> => {
  // Use dependency injection to get an instance of the AuthService
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in using the AuthService
  return authService.isAuthenticated().then((authenticated) => {
    if (!authenticated) {
      router.navigate(['/']);
    }
    return true;
  });
};
