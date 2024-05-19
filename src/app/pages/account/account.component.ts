import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  uid: string;
  user?: User;
  loaded = false;

  constructor(private userService: UserService, private router: Router) {
    const cred = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;

    this.uid = cred.uid;
  }

  ngOnInit() {
    this.userService.readByID(this.uid).subscribe((user) => {
      this.user = user;
      this.loaded = true;
    });
  }

  goToOrders() {
    this.router.navigateByUrl('/orders');
  }
}
