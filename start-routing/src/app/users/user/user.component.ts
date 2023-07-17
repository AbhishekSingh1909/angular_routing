import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    debugger;
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    //if something change in Url this observable will change
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      debugger;
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }
  ngOnDestroy(): void {
    // unsubscripe the param subscription at component has destroy because route observable will in memmory even component has destroyed.
    console.log('unsuscribed');
    this.paramSubscription.unsubscribe();
  }
}
