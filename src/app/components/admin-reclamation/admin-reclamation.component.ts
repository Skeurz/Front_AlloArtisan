import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/core/modeles/reclamation';
import { ReclamationService } from 'src/app/core/services/reclamation.service';
import * as alertifyjs from 'alertifyjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-reclamation',
  templateUrl: './admin-reclamation.component.html',
  styleUrls: ['./admin-reclamation.component.css']
})
export class AdminReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  


  constructor(private reclamationService: ReclamationService, private http: HttpClient) {}



  ngOnInit() : void {this.loadReclamations();}


  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations) => {
        this.reclamations = reclamations;
      },
      (error) => {
        console.error('erreur', error);
        
      }
    );
  }


  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamation(id).subscribe(
      () => {console.log('Reclamation supprimée.');alertifyjs.set('notifier', 'position', 'bottom-center');
      alertifyjs.success('Utilisateur supprimé');window.location.reload();},  
      (error) => {console.error('erreur', error);alertifyjs.set('notifier', 'position', 'bottom-center');
      alertifyjs.success('Utilisateur supprimé');window.location.reload()});
  }

}
