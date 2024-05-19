import { Timestamp } from '@angular/fire/firestore';
import { Cart } from './Cart';

export interface Order {
  id: string;
  user_id: string;
  date: Timestamp;
  status: string;
  items: Cart[];
}