import { Component } from '@angular/core';

@Component({
  selector: 'app-back2-top',
  templateUrl: './back2-top.component.html',
  styleUrls: ['./back2-top.component.css']
})
export class Back2TopComponent {
windowScrolled = false;


ngOnInit(): void {
  this.handleScroll();
  window.addEventListener('scroll', this.handleScroll.bind(this));
}






  BackToTop(): void {
    window.scrollTo(0, 0);
  }

  handleScroll(): void {
    const button = document.getElementById('back-to-top-btn');
  
    if (button) {
      if (window.scrollY > 0) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    }
  }



}

  


