import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // this is the object which contains the email and password entered into the inputs in login.component.html file trough [(ngModel)]
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    // dependency injection --- declaration of instance of objects in order to use their methods
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.credentials).then(x => {
      // we use the router to navigate to another page after succesful login
      this.router.navigate(['dashboard', 'request']);
      // we set the email of the current user in localStorage
      localStorage.setItem('loggedIn', this.credentials.username);
      this.authService.postLoginEvent();
    }).catch(err => {
      alert('Credentials invalid');
      console.log(err);
    })
  }

}
