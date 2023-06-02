import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedinUser : string;
  images: string[] = [
    'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/11091016/pexels-photo-11091016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'];
  currentImageIndex: number = 0;


  
  constructor(){}
  
  ngOnInit(): void {this.startImageRotation();}
  startImageRotation(): void {
    setTimeout(() => {
      this.rotateImage();
      this.startImageRotation();
    }, 5000);
  }

  rotateImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }



  loggedin() {
    //return localStorage.getItem('access_token');
    this.loggedinUser = localStorage.getItem('access_token')!;
    return this.loggedinUser
  }
  onLogout() {
    localStorage.removeItem('access_token');
  }

}

