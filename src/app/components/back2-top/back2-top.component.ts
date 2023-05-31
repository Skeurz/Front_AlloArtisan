import { Component } from '@angular/core';

@Component({
  selector: 'app-back2-top',
  templateUrl: './back2-top.component.html',
  styleUrls: ['./back2-top.component.css']
})
export class Back2TopComponent {


  BackToTop() {

    scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

}


