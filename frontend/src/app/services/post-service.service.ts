import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient,
    ) { }

//Get All Posts
  getPosts(){
    return this.http.get(environment.api+'/main/getposts')
  }

  getPost(id){
    return this.http.get(environment.api + '/main/getpost/' + id)
  }

  //Add Post to DB
  addPost(data, id){
    return this.http.post(environment.api+'/main/createpost/'+id, data)
  }

  //get All Comments
  getComments(id){
    return this.http.get(environment.api+'/main/getcomments/'+id)
  }

  deletePost(id){
    return this.http.delete(environment.api+'/main/deletepost/'+id)
  }

  editPost(post){
    return this.http.put(environment.api+'/main/updatepost', post)
  }

  uploadImage(data){
    console.log(data, 'image')
    return this.http.post(environment.api+'/uploadImage',data);
  }


}
