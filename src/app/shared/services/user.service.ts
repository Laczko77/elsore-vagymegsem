import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private tarolo: AngularFirestore) { }

  create(user: User){
    return this.tarolo.collection<User>(this.collectionName).doc(user.id).set(user);
  }
  
  readRow(){
    return this.tarolo.collection<User>(this.collectionName).valueChanges();
  }

  readByID(id: string){
    return this.tarolo.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User){
    return this.tarolo.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string){
    return this.tarolo.collection<User>(this.collectionName).doc(id).delete();
  }

}
 