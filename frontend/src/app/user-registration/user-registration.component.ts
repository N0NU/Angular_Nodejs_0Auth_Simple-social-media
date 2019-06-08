import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
    if(this.userService.isLoggedIn){
      this.router.navigate(['/home'])
    }
  }

  googleAuth(){
    this.userService.login()
  }

}
