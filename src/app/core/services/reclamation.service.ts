import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../modeles/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
   urlApi = 'http://localhost:8090';
   headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor(private http: HttpClient) { }

  saveReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.urlApi}/ajouter/reclamation`, reclamation);
  }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.urlApi}/reclamations`);
  }

  deleteReclamation(id: number): Observable<void> {
    const url = `${this.urlApi}/deletereclamation/${id}`;
    return this.http.delete<void>(url);
  }
}
