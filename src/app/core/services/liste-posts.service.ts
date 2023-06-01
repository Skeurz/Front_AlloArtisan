import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../modeles/post';
import { User } from '../modeles/user';

@Injectable({
  providedIn: 'root'
})
export class ListePostsService {

  urlApi="http://localhost:8090"
  
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor(private http :HttpClient) { }



    lancerPost(post:Post): Observable<Post> {
    return this.http.post <Post>(`${this.urlApi}/offre`,post);}
  
    getAllPosts():Observable<Post[]>{
      return this.http.get<Post[]>
      (this.urlApi+'/offres');}
  
    getAllService():Observable<Post[]>{
      return this.http.get<Post[]>(`${this.urlApi}/posts/service`);}
  
    getAllBesoin():Observable<Post[]>{
      return this.http.get<Post[]>(`${this.urlApi}/posts/besoin`);}

    deletePost(id: number): Observable<any> {
        const url = `${this.urlApi}/deletepost/${id}`;
        return this.http.delete(url);
      }
    updatePost(post: Post): Observable<Post> {
        const url = `${this.urlApi}/editoffre/${post.id}`;
        return this.http.put<Post>(url, post);
      }
  
    getPost(id: string): Observable<Post> {
        const url = `${this.urlApi}/${id}`;
        return this.http.get<Post>(url);
      }
  
    getPostsByType(type: string): Observable<Post[]> {
        const url = `${this.urlApi}/offres/${type}`;
        return this.http.get<Post[]>(url);
      }




}


