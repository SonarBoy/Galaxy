import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Galaxy } from '../model/galaxy';

@Injectable({
  providedIn: 'root'
})
export class GalaxyService {

  private endpoint = 'http://localhost:3000/api/Galaxy';
  //private endpoint = 'https://galaxy-x.herokuapp.com/api/Galaxy';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  constructor(private http: HttpClient) { }

  public getGalaxyList(): Observable<any>{
    return this.http.get<any>(this.endpoint,this.httpOptions);
  }

  public getGalaxy(editGalaxy: Galaxy): Observable<any>{
    return this.http.get<any>(this.endpoint + '/edit/' + editGalaxy._id,this.httpOptions);
  }

  public postEditGalaxy(editGalaxy: Galaxy): Observable<any>{
    return this.http.post<any>(this.endpoint + '/edit/' + editGalaxy._id,editGalaxy,this.httpOptions);
  }

  public addGalaxy(addingGalaxy: Galaxy): Observable<any>{
    return this.http.post<any>(this.endpoint+'/add',addingGalaxy,this.httpOptions);
  }

  public deleteGalaxy(deleteGalaxy: Galaxy):Observable<any>{
    return this.http.get<any>(this.endpoint + '/delete/' + deleteGalaxy._id,this.httpOptions);
  }


}
