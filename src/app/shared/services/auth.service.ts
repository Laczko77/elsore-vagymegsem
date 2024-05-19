import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  auth: AngularFireAuth) { }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  isEmailAlreadyInUse(email: string) {
    try {
      this.auth.createUserWithEmailAndPassword(email, 'password');
      return false; // Ha nincs hiba, az e-mail cím még nem használatban van
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return true; // Az "email-already-in-use" hibakód azt jelzi, hogy az e-mail cím már használatban van
      } else {
        throw error; // Ha más típusú hiba történik, dobja tovább az error-t
      }
    }
  }

}
