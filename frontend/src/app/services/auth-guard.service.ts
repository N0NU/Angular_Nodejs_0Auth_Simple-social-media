import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: UserServiceService, private router: Router ) { }

  canActivate(next: ActivatedRouteSnapshot) {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }

  }
}
