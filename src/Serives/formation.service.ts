import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Formation {
  id: number;
  name: string;
  description: string;
  formateur: string;
  debut: Date;
  fin: Date;
  heures: number;
  prix: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiUrl = 'http://localhost:8086/Formation';

  constructor(private http: HttpClient) { }

  getFormations(): Observable<Formation[]> {

    return this.http.get<Formation[]>(`${this.apiUrl}/GetFormation`);
    
  }

  getAtelier(): Observable<Formation[]> {

    return this.http.get<Formation[]>(`${this.apiUrl}/GetFormation`);

  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/AddFormation`, formation);
  }
}
