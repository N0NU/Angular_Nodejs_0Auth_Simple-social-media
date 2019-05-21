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
    return this.http.get(environment.api+'/post/getposts')
  }

  getComments(id){
    return this.http.get(environment.api+'/post/getcomments/'+id)
  }
}
