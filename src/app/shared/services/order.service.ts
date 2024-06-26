import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  collectionName = 'Orders';

  constructor(private afs: AngularFirestore) {}

  create(order: Order) {
    order.id = this.afs.createId();
    return this.afs
      .collection<Order>(this.collectionName)
      .doc(order.id)
      .set(order);
  }

  getAll() {
    return this.afs.collection<Order>(this.collectionName).valueChanges();
  }

  getByUserId(user_id: string) {
    return this.afs
      .collection<Order>(this.collectionName, (ref) =>
        ref.where('user_id', '==', user_id)
      )
      .valueChanges();
  }

  update(order: Order) {
    return this.afs
      .collection<Order>(this.collectionName)
      .doc(order.id)
      .set(order);
  }

  delete(id: string) {
    return this.afs.collection<Order>(this.collectionName).doc(id).delete();
  }
}
