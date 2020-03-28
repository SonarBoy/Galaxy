import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from '../model/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  
  private endpoint = 'mongodb+srv://Joshua:<password>@galaxy-imd4r.mongodb.net/test?retryWrites=true&w=majority';
  //private endpoint = 'http://localhost:3000/api/Planets';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  }
  constructor(private http: HttpClient) { }

  public getPlanetList(): Observable<any>{
    return this.http.get<any>(this.endpoint,this.httpOptions);
  }

  public getPlanet(editPlanet: Planet): Observable<any>{
    return this.http.get<any>(this.endpoint+'/edit/'+editPlanet._id,this.httpOptions);
  }

  public postEditPlanet(editPlanet: Planet):Observable<any>{
    return this.http.post<any>(this.endpoint+'/edit/'+editPlanet._id,editPlanet,this.httpOptions);
  }

  public addPlanet(addingPlanet: Planet):Observable<any>{
    return this.http.post<any>(this.endpoint+'/add',addingPlanet,this.httpOptions);
  }

  public deletePlanet(deletePlanet: Planet):Observable<any>{
    return this.http.get<any>(this.endpoint+'/delete/'+deletePlanet._id,this.httpOptions);
  }


}
