import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedinUser : string;

  
  constructor(){}
  
  ngOnInit() {}


  loggedin() {
    //return localStorage.getItem('access_token');
    this.loggedinUser = localStorage.getItem('access_token')!;
    return this.loggedinUser
  }
  onLogout() {
    localStorage.removeItem('access_token');
  }

}

