import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public showMyMessage = false
  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 1000)
  }
}
