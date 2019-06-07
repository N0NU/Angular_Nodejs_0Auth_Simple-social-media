import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }

  googleAuth(){
    this.userService.login()
  }

}
