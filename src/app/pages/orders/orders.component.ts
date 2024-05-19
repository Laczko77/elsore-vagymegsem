import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { OrderService } from '../../shared/services/order.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['items', 'status', 'date'];
  orders: Order[] = [];
  uid: string;
  loaded = false;

  constructor(private orderService: OrderService, private location: Location,private router: Router,) {
    const cred = JSON.parse(
      localStorage.getItem('user') as string
    ) as firebase.default.User;

    this.uid = cred.uid;
  }

  ngOnInit() {
    this.orderService.getByUserId(this.uid).subscribe((orders) => {
      this.orders = orders;
      this.loaded = true;
    });
  }

  goBack() {
    this.router.navigateByUrl('/account');
  }
}