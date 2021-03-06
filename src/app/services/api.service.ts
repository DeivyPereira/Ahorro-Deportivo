import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token:any
  url = 'http://api.football-data.org/v2'
  //httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }) };
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json', 'X-Auth-Token':'c788db643b12439b9429f3de456ee0d8' }) };
  //httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
  constructor(private http: HttpClient) { }
  get(endpoint: string, params?: any, reqOpts?: any) : Observable<any>{
    return this.http.get(this.url + '/' + endpoint, this.httpOptions);
  }

  post(endpoint: string, body: any, reqOpts?: any) : Observable<any>{
    return this.http.post(this.url + '/' + endpoint, body);
  }

  put(endpoint: string, body: any, reqOpts?: any) : Observable<any>{
    return this.http.put(this.url + '/' + endpoint, body, this.httpOptions);
  }

  delete(endpoint: string, reqOpts?: any) : Observable<any>{
    return this.http.delete(this.url + '/' + endpoint, this.httpOptions);
  }

  patch(endpoint: string, body: any, reqOpts?: any) : Observable<any>{
    return this.http.put(this.url + '/' + endpoint, body, this.httpOptions);
  }
}
