import { Component } from '@angular/core';

@Component({
  selector: 'app-passoublie',
  templateUrl: './passoublie.component.html',
  styleUrls: ['./passoublie.component.css']
})
export class PassoublieComponent {
  
  public showMyMessage = false
  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 1000)
  }
}
