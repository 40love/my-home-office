import { AuthService } from './../login/auth.service';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // we declare a new currentUser object to have the email and role
  currentUser: any = {
    email: '',
    isApprover: false
  };

  constructor(
    private dashService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // get current user from database 
    this.dashService.getCurrentUser().then(x => {
      if (x.size) {
        x.docs.forEach(res => {
          this.currentUser = res.data();
        })
      }
    });
  }

  collapse(){
    $('.navbar-collapse').removeClass('show');
  }

  signOut() {
    this.authService.logout().then(x => {
      localStorage.clear();
      this.router.navigate(['']);
    });
  }

}
