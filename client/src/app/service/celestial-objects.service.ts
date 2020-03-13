import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CelestialObject } from '../model/celestial-object';


@Injectable({
  providedIn: 'root'
})
export class CelestialObjectsService {

  private endpoint = 'http://localhost:3000/api/celestialObjects';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  constructor(private http: HttpClient) { }

  public getCelestialObjectsList(): Observable<any>{
    return this.http.get<any>(this.endpoint,this.httpOptions);
  }

  public getCelestialObject(celestialObject:CelestialObject): Observable<any>{
    return this.http.get<any>(this.endpoint + '/edit/'+ celestialObject._id,this.httpOptions);
  }

  public postCelestialObject(celestialObject:CelestialObject): Observable<any>{
    return this.http.post<any>(this.endpoint + '/edit/'+ celestialObject._id,celestialObject,this.httpOptions);
  }

  public addCelestialObject(celestialObject:CelestialObject): Observable<any>{
    return this.http.post<any>(this.endpoint + '/add',celestialObject,this.httpOptions);
  }

  public deleteCelestialObject(celestialObject:CelestialObject): Observable<any>{
    return this.http.get<any>(this.endpoint + '/delete/'+ celestialObject._id,this.httpOptions);
  }

}
