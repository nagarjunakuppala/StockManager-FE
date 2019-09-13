import { Injectable } from '@angular/core';

import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockInfoService {

  URI = 'http://localhost:8005/api/';

  constructor(private http: Http) { }
  
  public createUser(userName, quotes) {
    //let URI = 'http://localhost:8005/rest/db/create';
    let headers = new Headers;
     var message = {
       userName: userName,
       quotes:[quotes]
     }
     let body = JSON.stringify({
      userName: userName,
      quotes: quotes});
    console.log(message);
    console.log(body);
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //headers.append('Access-Control-Allow-Headers: Origin', 'Content-Type, X-Auth-Token');
    headers.append('Content-Type', 'application/json');
   return this.http.post(this.URI+'db-service/rest/db/create', body ,{headers: headers});
}

public getStocks(userName):Observable<any>{
  //let URI = 'http://10.0.0.96:8005/stock-service/rest/stock/';
  return this.http.get(this.URI+'stock-service/rest/stock/'+userName);
}

public saveStocks(data){

  //let URI = 'http://localhost:8005/rest/db/stock/store';
  let headers = new Headers;
  headers.append('Content-Type', 'application/json');
  return this.http.post(this.URI+'db-service/rest/db/stock/store', data ,{headers: headers});

}

public getStockHistory(userName, quote):Observable<any>{
    //let URI = 'http://localhost:8005/rest/db/stock/';
    return this.http.get(this.URI+'db-service/rest/db/stock/'+userName);
}

}
