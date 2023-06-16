import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
    'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4509089/pexels-photo-4509089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/994164/pexels-photo-994164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',];
  currentImageIndex: number = 0;


  
  constructor(private router: Router){}
  
  ngOnInit(): void {this.startImageRotation();}


  startImageRotation(): void {
    setTimeout(() => {
      this.rotateImage();
      this.startImageRotation();
    }, 5000);
  }

  rotateImage(): void {
  const previousImageIndex = this.currentImageIndex;
  this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

  const imageContainers = document.getElementsByClassName('image-container');
  if (previousImageIndex >= 0 && previousImageIndex < imageContainers.length) {
    imageContainers[previousImageIndex].classList.add('hidden');
  }
  if (this.currentImageIndex >= 0 && this.currentImageIndex < imageContainers.length) {
    imageContainers[this.currentImageIndex].classList.remove('hidden');
  }
}




  loggedin() {
    //return localStorage.getItem('access_token');
    this.loggedinUser = localStorage.getItem('access_token')!;
    return this.loggedinUser
  }
  onLogout() {
    localStorage.removeItem('access_token');
  }

  
  redirectToLink(url: string): void {
    this.router.navigate([url]);
  }
  
  
}

