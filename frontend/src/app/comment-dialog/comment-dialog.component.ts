import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostServiceService } from '../services/post-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postService: PostServiceService, private userService: UserServiceService) {}
post;
  ngOnInit() {
    this.getPost()
  }

  getPost(){
    let id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe(res => {this.post = res; console.log(this.post)})

  }

  async addComment(comment){
    await this.userService.getCurrentUser()
    var commentData = {
      commentBy: this.userService.currentUser._id,
    commentContent: comment.value,
    }
    console.log(commentData)
    
    
  }

}
