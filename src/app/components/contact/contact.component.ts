
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reclamation } from 'src/app/core/modeles/reclamation';
import { ReclamationService } from 'src/app/core/services/reclamation.service';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  reclamationForm: FormGroup;
  reclamations: Reclamation[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService
  ) {  }

  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.reclamationForm.invalid) {
      return;
    }

    const reclamation: Reclamation = this.reclamationForm.value;
    this.reclamationService.saveReclamation(reclamation)
      .subscribe(savedReclamation => {
        this.reclamationForm.reset();
        alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.success('Reclamation envoyée');
      });
      console.log(reclamation)
  }















  








}
