import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../models/Product';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Product';

  constructor(private tarolo: AngularFirestore, private storage: AngularFireStorage) {
     }

  getProducts(): Observable<Product[]> {
    return this.tarolo.collection<Product>('Product').valueChanges();
  }
  getProductById() {
    return this.tarolo.collection<Product>('Product').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action =>{
          const data = action.payload.doc.data() as Product;
          return {id: action.payload.doc.id, name: data.name};
        });
      })
    );
  }
  
  create(product: Product) {
    product.id = this.tarolo.createId();
    return this.tarolo
      .collection<Product>(this.collectionName)
      .doc(product.id)
      .set(product);
  }

  getAll() {
    return this.tarolo
      .collection<Product>(this.collectionName, (ref) => ref.orderBy('price'))
      .valueChanges();
  }



  update(product: Product) {
    return this.tarolo
      .collection<Product>(this.collectionName)
      .doc(product.id)
      .set(product);
  }

  delete(id: string) {
    return this.tarolo.collection<Product>(this.collectionName).doc(id).delete();
  }
}