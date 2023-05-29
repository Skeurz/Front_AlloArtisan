import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

 
  constructor( private router: Router) { }
  getToken() {
    return localStorage.getItem('access_token');
  }
  saveToken(access_token:string) :void{
    return localStorage.setItem('token',access_token);
   
  }
 
  getIsLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  

doLogout() {
  let removeToken = localStorage.removeItem('access_token');
  if (removeToken == null) {
    this.router.navigate(['/login']);
  }
}
public saveUser(user: any): void {
  sessionStorage.setItem('user', JSON.stringify(user));
}
public getUser(): any {
  const user = window.sessionStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }

  return {};
}

}
