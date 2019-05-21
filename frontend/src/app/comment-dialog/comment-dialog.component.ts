import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
post;
  ngOnInit() {
    this.post = this.data.post;
    console.log(this.post)
  }

}
