import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
// postSubmit: FormGroup;
  constructor() { }

  ngOnInit() {
    // this.postSubmit =  this._formBuilder.group({
    //   content: ['', Validators.required]
    // })
  }

  // model: any = {};

  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

}
