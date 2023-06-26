

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  token: string;

  constructor(
    private route: ActivatedRoute,
    private confirmationService: AuthentificationServiceService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.confirmEmail();
      }
    });
  }

  confirmEmail() {
    this.confirmationService.confirmEmail(this.token).subscribe(
      () => {
        // Email confirmed successfully
        // Add any necessary logic or redirect to a success page
      },
      (error) => {
        // Handle error, display error message, or redirect to an error page
      }
    );
  }
}
