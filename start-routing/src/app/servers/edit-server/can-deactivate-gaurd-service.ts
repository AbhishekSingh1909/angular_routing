import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

//Implementing the guard as a function
export const canDecativateGaurd: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  route: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  debugger;
  return component.canDeactivate();
};
