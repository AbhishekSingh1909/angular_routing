import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private route: Router, private authService: AuthService) {}

  ngOnInit() {}

  onServerLoad(id: number) {
    this.route.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: 1 },
      fragment: 'loading',
    }); // Absolute Path defined because server page load from here
  }

  onLogIn() {
    this.authService.logIn();
  }
  onLogOut() {
    this.authService.logOut();
  }
}
