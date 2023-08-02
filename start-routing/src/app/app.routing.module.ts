import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { authGuard } from './auth.guards.service';
import { canDecativateGaurd } from './servers/edit-server/can-deactivate-gaurd-service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },

  {
    path: 'servers',
    //canActivate: [authGuard],
    //to protect child route
    canActivateChild: [authGuard],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: serverResolver },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        // to prevent unsaved changes
        canDeactivate: [canDecativateGaurd],
      },
    ],
  },
  //this one should be last route
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  //By default, Angular matches paths by prefix.
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  // to access this in other component
  exports: [RouterModule],
})
export class AppRoutingModuleComponent {}
