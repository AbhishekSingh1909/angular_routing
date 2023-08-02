import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { IServer } from './Interface/server-interface';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ServersService } from '../servers.service';

export const serverResolver: ResolveFn<IServer> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<IServer> | Promise<IServer> | IServer => {
  const serversService = inject(ServersService);

  return serversService.getServer(+route.params['id']);
};
