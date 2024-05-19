import { Component } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Order } from '../../shared/models/Order';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { UserService } from '../../shared/services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  displayedColumns: string[] = ['name', 'price', 'quantity'];
  cartItems: Cart[] = [];
  price = 0;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService
  ) {
    this.cartItems = JSON.parse(localStorage.getItem('Carts') || '[]');
    this.updatePrice();
  }

  async order() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.cartItems.length === 0) {
      this.snackBar.open('A kosár üres!', 'Bezárás', {
        duration: 2000,
      });
      return;
    }

    const uid = JSON.parse(user).uid;

    const _user = await firstValueFrom(this.userService.readByID(uid));
    if (!_user) return;

  

    const order: Order = {
      id: '',
      user_id: uid,
      date: Timestamp.now(),
      status: 'függőben',
      items: this.cartItems,
    };

    await this.orderService.create(order);
    await this.userService.update(_user);

    localStorage.removeItem('Carts');
    this.cartItems = [];
    this.updatePrice();
    this.router.navigateByUrl('/orders');
    
    this.snackBar.open('Sikeres rendelés!', 'Bezárás', {
      duration: 2000,
    });
  }

  emptyCart() {
    localStorage.removeItem('Carts');
    this.cartItems = [];
    this.updatePrice();

    this.snackBar.open('Kosár kiürítve!', 'Bezárás', {
      duration: 2000,
    });
  }

  updatePrice() {
    this.price = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
} 