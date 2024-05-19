import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent{
 
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    username: new FormControl('')
  });

  loading: boolean = false;

  constructor (private router: Router, private location: Location, private authService: AuthService, private userService: UserService,private snackBar: MatSnackBar) { }


  onSubmit() {
    this.loading = true;
  
    this.authService.signup(
      this.signUpForm.get('email')?.value as string,
      this.signUpForm.get('password')?.value as string
    ).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('username')?.value as string,
      };
  
      return this.userService.create(user).then(() => {
        this.snackBar.open('Sikeres regisztráció!', 'Bezárás', {
          duration: 3000,
        });
        console.log('User added successfully.');
        this.router.navigateByUrl('/main');
      });
    }).catch(error => {
      let errorMessage: string;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Már létezik felhasználó ezzel az e-mail címmel!';
      } else {
        errorMessage = 'Hiba történt a regisztráció során (túl rövid jelszó, stb.)!';
      }
  
      this.snackBar.open(errorMessage, 'Bezárás', {
        duration: 3000,
      });
    }).finally(() => {
      this.loading = false;
    });
  }

  goBack() {
    this.location.back();
  }
}