import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  selectFile;
  images;
  postForm: FormGroup
  constructor(private postService: PostServiceService, private fb: FormBuilder, private userService: UserServiceService) {
    this.postForm = this.fb.group({
      content: new FormControl(''),
      images: ([])
    })
  }

  ngOnInit() {

  }

  onFileSelect(event) {
    this.selectFile = <File>event.target.files;
    function map(array, transform) {
      let mapped = [];
      for (let element of array) {
        mapped.push(transform(element));
      }
      return mapped;
    }
    this.images = map(event.target.files, s => s.name)
  }

  postFormSubmit(form) {
    form.value.images = this.images
    let id = this.userService.currentUser._id
    console.log(form.value)
    this.postService.addPost(form.value, id).subscribe(res => {
    })
    this.uploadImage();
  }

  uploadImage() {
    const fd = new FormData();
    if (this.selectFile) {
      for (let i = 0; i < this.selectFile.length; i++) {
        fd.append('images', this.selectFile[i], this.selectFile[i].name);
        this.postService.uploadImage(fd).subscribe((data) => console.log(data));
      }
    }


  }

}
