import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: String = 'https://abev-backend.herokuapp.com/';
  barUrl: String = 'https://api.apispreadsheets.com/data/1616/';
  
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  
  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<any> {
    return this.http.get(
      this.baseUrl + 'produtos/',
      {
        headers: this.httpHeaders
      }
    )
  }
  createRequest(pedido){
    return this.http.post(
      this.baseUrl + 'pedidos/', pedido,
      {
        headers: this.httpHeaders
      }
    )
  }

  barManagementAdd(req){
    return this.http.post(
      'https://api.apispreadsheets.com/data/1616/', req,
      {
        headers: this.httpHeaders
      }
    )
  }

}
