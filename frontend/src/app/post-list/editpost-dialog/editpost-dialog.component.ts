import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editpost-dialog',
  templateUrl: './editpost-dialog.component.html',
  styleUrls: ['./editpost-dialog.component.css']
})
export class EditpostDialogComponent implements OnInit {
  selectFile;
  images = [];
  postForm: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private postService: PostServiceService,
    private fb: FormBuilder,
    private userService: UserServiceService,
    private notification: NotificationService) {

    this.postForm = this.fb.group({
      content: new FormControl(this.data.post.content),
      fImages: new FormArray([])
    })
  }

  ngOnInit() {
    console.log(this.data, 'data')
    if (this.data.post.images) {
      this.data.post.images.forEach(ele => {
        this.addCreds(ele);
      })
    }
    this.postForm.patchValue(this.data.post);
  }

  onFileSelect(event) {
    var postForm = this.postForm;
    var fb = this.fb
    this.selectFile = <File>event.target.files;
      for (let element of event.target.files) {
        let control = <FormArray>postForm.controls.fImages;
        control.push(
          fb.group({
            image: element.name,
          })
          )
      }
    }

  updatepost(form) {
    let id = this.userService.currentUser._id
    form.value.createdAt = this.data.post.createdAt
    form.value.id = this.data.post._id
    form.value.updatedAt = Date.now()
    form.postBy = this.data.post.postBy
    form.postComments = this.data.post.postComments
    form.value.fImages.forEach(ele => this.images.push(ele.image))
    form.value.images = this.images
    console.log(form.value)
    this.postService.editPost(form.value).subscribe(res => {
      console.log(res, 'res')
    }, err => this.notification.warning(err.error.message))
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

  deleteCreds(index) {
    let control = <FormArray>this.postForm.controls.fImages;
    control.removeAt(index);
  }

  addCreds(ele) {
    let control = <FormArray>this.postForm.controls.fImages;
    control.push(
      this.fb.group({
        image: [ele]
      })
    );
  }
}
