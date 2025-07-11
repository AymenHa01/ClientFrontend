import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtelierServiceService {
private Path = "http://localhost:8086/Atelier"
  constructor(private http : HttpClient  ) { }

  GetAllAtelier(){
    return this.http.get(this.Path+"/GetAllAtelier")
  }
  GetSousAtelier(id : string ){
    return this.http.get(this.Path+"/GetSousAtelier/" + id )
  }

}
