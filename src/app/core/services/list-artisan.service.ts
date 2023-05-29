import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../modeles/post';
import { User } from '../modeles/user';

@Injectable({
  providedIn: 'root'
})
export class ListArtisanService {

  urlApi="http://localhost:8090"
  
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor ( private http :HttpClient){}

 /*  getAllArtisan():Observable<User[]>{
    return this.http.get<User[]>
    ('http://localhost:8090/users');} */

    getAllArtisan():Observable<User[]>{
      return this.http.get<User[]>
      (this.urlApi+'/users');}

      getArtisanById(id: number): Observable<User>{
        //  return this.http.get<User>(`${this.urlApi}user/${id}`)
        return this.http.get<User>(`${this.urlApi}/profile/${id}`)
        }   

        
   lancerPost(post:Post): Observable<Post> {
  return this.http.post <Post>(`${this.urlApi}/offre`,post);}

  getAllService():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.urlApi}/posts/service`);}

  getAllBesoin():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.urlApi}/posts/besoin`);}

  deleteUser(id: number): Observable<any> {
      const url = `${this.urlApi}/delete/${id}`;
      return this.http.delete(url);
    }
 




}
