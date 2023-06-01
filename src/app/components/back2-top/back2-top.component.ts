import { Component } from '@angular/core';

@Component({
  selector: 'app-back2-top',
  templateUrl: './back2-top.component.html',
  styleUrls: ['./back2-top.component.css']
})
export class Back2TopComponent {
windowScrolled = false;





  BackToTop(): void {
    window.scrollTo(0, 0);
  }
 
  }

  


