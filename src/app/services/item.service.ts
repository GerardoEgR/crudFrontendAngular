import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  creditSimulation(value: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/credits`, value);
  }
}
