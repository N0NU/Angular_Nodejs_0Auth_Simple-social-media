import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';
import {MatDialog} from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private postService: PostServiceService, 
    private dialog: MatDialog) { }
  posts;
  showCommentSec = false;
  ngOnInit() {
    this.postService.getPosts().subscribe((res)=>{
      // res['updatedAt'] = this.parseISOString(res['updatedAt'])
      // if(err){
      //   console.log(err.message)
      // }
      this.posts = res;
      console.log(res, 'res')

    })
  }

  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  showComments(post){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: {post: post}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      
    });
  }

}
