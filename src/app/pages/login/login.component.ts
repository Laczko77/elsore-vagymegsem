import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnDestroy{

  /*logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });*/
 
  email = new FormControl('');
  password = new FormControl('');
  // email: test@gmail.com
  // jelszó: testpw 
  loadingSubscription?: Subscription;
  
  loading: boolean = false;

  

  constructor(private router: Router, private authService: AuthService,private snackBar: MatSnackBar){}
  

  /*async login(){
    this.loading = true;

    this.authService.login(this.email.value as string, this.password.value as string).then(cred =>{
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error =>{
      console.error(error);
      this.loading = false;
    });
  }*/

  async login() {
    this.loading = true; // Először beállítjuk a loading értékét true-ra
  
    try {
      const cred = await this.authService.login(
        this.email.value as string,
        this.password.value as string
      );
      this.router.navigateByUrl('/main');
      this.snackBar.open('Sikeres bejelentkezés!', 'Bezárás', {
        duration: 3000,
      });
    } catch (error: any) {
      this.snackBar.open('Helytelen e-mail/jelszó!', 'Bezárás', {
        duration: 3000,
      });
    } finally {
      this.loading = false; // Végül pedig visszaállítjuk a loading értékét false-ra
    }
  }
  
  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}

