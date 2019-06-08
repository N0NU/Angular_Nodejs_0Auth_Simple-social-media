import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';
import { MatDialog } from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { NotificationService } from '../services/notification.service';
import { EditpostDialogComponent } from './editpost-dialog/editpost-dialog.component';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private postService: PostServiceService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userService: UserServiceService) { }
  posts;
  showCommentSec = false;
  currentUser;
  ngOnInit() {
    this.getPosts()
    setTimeout(() => {
      this.currentUser = this.userService.currentUser
    }, 0)

  }

  getPosts() {
    this.postService.getPosts().subscribe((res) => {
      console.log
      this.posts = res;
    })
  }

  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  deletepost(id) {
    this.postService.deletePost(id).subscribe(res => {
      this.notificationService.success(res['message'])
      this.getPosts()
    }, err => this.notificationService.warning(err.error.message))
  }

  editpost(post) {
    const dialogRef = this.dialog.open(EditpostDialogComponent, {
      data: { post: post }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');

    });
  }

}
