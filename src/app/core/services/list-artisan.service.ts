import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../modeles/post';
import { User } from '../modeles/user';
import { AppRole } from '../modeles/role';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ListArtisanService {
  private loggedInUserId: number;
  urlApi="http://localhost:8090"
  
  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor ( private http :HttpClient){}

 

    getAllArtisan():Observable<User[]>{
      return this.http.get<User[]>
      (this.urlApi+'/users');}

      getArtisanById(id: number): Observable<User>{
        return this.http.get<User>(`${this.urlApi}/profil/${id}`)
        }  

    deleteUser(id: number): Observable<any> {
      const url = `${this.urlApi}/delete/${id}`;
      return this.http.delete(url);
    }

    updateUser(user: User): Observable<User> {
      const url = `${this.urlApi}/edit/${user.id}`;
      return this.http.put<User>(url, user);
    } 

    getUser(id: string): Observable<User> {
      const url = `${this.urlApi}/${id}`;
      return this.http.get<User>(url);
    }

    getUserByUserName (userName:string){
      return this.http.get<User>(`${this.urlApi}/users/${userName}`)
    }
   

    getUserRoles(id: number): Observable<string[]> {
      const url = `${this.urlApi}/${id}/roles`;
      return this.http.get<AppRole[]>(url).pipe(
        map((roles: AppRole[]) => roles.map(role => role.role))
      );
    }


    getUserByAdresse(adresse: string): Observable<any> {
      const url = `${this.urlApi}/${adresse}`;
      return this.http.get<any>(url);
    }



    getUsersByRoleId(idRole: number): Observable<any> {
      return this.http.get<any>(`${this.urlApi}/roles/${idRole}`);
    }

    
 
    sendPasswordResetEmail(email: string): Observable<any> {
      const url = `${this.urlApi}/forgot-password`;
      const payload = { email: email };
      return this.http.post(url, payload);
    }

    isLoggedIn(): boolean { 
      const token = localStorage.getItem('access_token');
      return !!token; 
    }

   


}
