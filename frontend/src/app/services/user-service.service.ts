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

  getCurrentUser(){
    if(localStorage.getItem('id')){
      return new Promise((resolve, reject) => {
        this.http.get(environment.api + '/user/currentuser/' + localStorage.getItem('id')).subscribe(res => {
        this.currentUser = res
      resolve(true);
      })
    })
    }
  }

  addUser(data) {
     this.http.post(environment.api + '/user/createuser', data).subscribe(res=>{this.currentUser = res
    console.log(res, 'curr')
    })
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
    console.log(this.accessToken, this.expiresAt, 'session')
    localStorage.setItem('token', this.accessToken)
    localStorage.setItem('id', authResult.idTokenPayload.sub.replace("google-oauth2|", ""))
    localStorage.setItem('expiresAt', JSON.stringify(this.expiresAt))
    
  }

  // Log out of Auth0 session
  // Ensure that returnTo URL is specified in Auth0
  // Application settings for Allowed Logout URLs
  public logout(): void {
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.router.navigate(['/register'])
  }

  // Checks whether the expiry time for the user's Access Token has passed and that user is signed in locally.
  get isLoggedIn(): boolean {
    return Date.now() < parseInt(localStorage.getItem('expiresAt')) && !!localStorage.getItem('token');
  }

}
