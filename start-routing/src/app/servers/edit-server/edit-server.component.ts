import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-gaurd-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changedSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    debugger;
    const id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((queryParams) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    //to get active url parameter id
    this.route.params.subscribe((params) => {
      const id = params['id'] ?? '1';
      this.server = this.serversService.getServer(Number(id));
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changedSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    debugger;
    if (!this.allowEdit) {
      return true;
    }

    if (
      !this.changedSaved &&
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status)
    ) {
      return confirm('Do you discard these changes?');
    } else {
      return true;
    }
  }
}
