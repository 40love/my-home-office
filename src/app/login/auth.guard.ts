import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if there is no 'loggedIn' key  in localStorage then you are not logged in and you are not allowed to go to other page than login page
    if (localStorage.getItem('loggedIn')) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}