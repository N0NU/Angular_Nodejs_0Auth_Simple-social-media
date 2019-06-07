import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private auth: UserServiceService) {
  }
  user: any
  profile: any = {
    name: String,
    id: String,
    image: String
  }
  ngOnInit() {
    this.user = this.auth.idTokenPayload
    if (this.user) {
      this.profile.name = this.user.name
      this.profile.id = this.user.sub
      this.profile.image = this.user.picture
    }
    this.auth.addUser(this.profile)

  }

}
