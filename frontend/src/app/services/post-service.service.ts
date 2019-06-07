import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient,
    ) { }

  getPosts(){
    return this.http.get(environment.api+'/main/getposts')
  }

  addPost(data, id){
    return this.http.post(environment.api+'/main/createpost/'+id, data)
  }

  getComments(id){
    return this.http.get(environment.api+'/main/getcomments/'+id)
  }

  uploadImage(data){
    console.log(data, 'image')
    return this.http.post(environment.api+'/uploadImage',data);
  }


}
