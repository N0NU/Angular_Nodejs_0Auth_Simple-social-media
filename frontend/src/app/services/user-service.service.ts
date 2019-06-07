import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;
  isUser: boolean;
  isEmployer: boolean;
  idTokenPayload: any;
  currentUser: any;


  auth0 = new auth0.WebAuth({
    clientID: 'w0VyFQz1xWv4cSQ6WtIbwvrYsHF3lA3t',
    domain: 'dev-s1dq4gok.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });
  constructor(private http: HttpClient, private router: Router) {
    this.userProfile = '';
    this.accessToken = '';
    this.expiresAt = 0;
  }

  addUser(data) {
     this.http.post(environment.api + '/user/createuser', data).subscribe(res=>{this.currentUser = res})
  }

  public login() {
    this.auth0.authorize();
  }

  public handleLoginCallback(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idTokenPayload) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }


  // Save authentication data and update login status subject
  private setSession(authResult) {
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.authenticated = true;
    this.idTokenPayload = authResult.idTokenPayload
    let token = {token: this.accessToken, expiresIn: this.expiresAt, authenticated: this.authenticated}
    localStorage.setItem('token', this.accessToken)
    localStorage.setItem('expiresAt', JSON.stringify(this.expiresAt))
    
  }

  // Log out of Auth0 session
  // Ensure that returnTo URL is specified in Auth0
  // Application settings for Allowed Logout URLs
  public logout(): void {
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: 'w0VyFQz1xWv4cSQ6WtIbwvrYsHF3lA3t'
    });
  }

  // Checks whether the expiry time for the user's Access Token has passed and that user is signed in locally.
  get isLoggedIn(): boolean {
    console.log(parseInt(localStorage.getItem('expiresAt')))
    return Date.now() < parseInt(localStorage.getItem('expiresAt')) && this.authenticated;
  }

}
