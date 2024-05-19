import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/Product';
import { Cart } from '../../shared/models/Cart';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  products!: Observable<Product[]>;
  loaded = false;
  
  cartItems!: Cart[];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.cartItems = JSON.parse(localStorage.getItem('Carts') || '[]');
  }

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      this.products = of(products);
      this.loaded = true;
    });
  }

  addToCart(id: string, name: string, price: number) {
    let newItem: Cart = {
      product_id: id,
      name: name,
      price: price,
      quantity: 1
    };  
  
    const existingItem = this.cartItems.find((item) => item.product_id === id);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(newItem);
    }
  
    localStorage.setItem('Carts', JSON.stringify(this.cartItems));
    console.log(newItem)
    this.snackBar.open('Hozzáadva a kosárhoz! ' + name, 'Bezárás', {
      duration: 2000,
    });
  }
}
