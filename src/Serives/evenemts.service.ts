import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvenemtsService {
  private apiUrl = 'http://localhost:8086/Evenemet';

  constructor(private http: HttpClient) {}

  getAllEvents() {

    return this.http.get(`${this.apiUrl}/GetAll`);
    
  }


}
