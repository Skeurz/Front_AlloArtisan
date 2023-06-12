import { Component } from '@angular/core';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';

@Component({
  selector: 'app-passoublie',
  templateUrl: './passoublie.component.html',
  styleUrls: ['./passoublie.component.css']
})
export class PassoublieComponent {
  email: string;
  constructor(private listArtisanService: ListArtisanService) {}
 /* public showMyMessage = false
  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 1000)
  }*/

  submitEmail() {
    this.listArtisanService.sendPasswordResetEmail(this.email)
      .subscribe(
        () => {
          // Handle success, e.g., show a success message
        },
        (error) => {
          // Handle error, e.g., display an error message
        }
      );
      console.log(this.email)
  }
}
