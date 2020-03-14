import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  private endpoint = 'http://localhost:3000/api/Users';

  private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  constructor(private http: HttpClient) { }

  public getList(): Observable<any>{
    return this.http.get<any>(this.endpoint,this.httpOptions);
  }

  public addUser(addingUser: User): Observable<any>{
    return this.http.post<any>(this.endpoint + '/add',addingUser, this.httpOptions);
  }

  public deleteUser(addingUser: User): Observable<any>{
    return this.http.get<any>(this.endpoint + '/delete/' + addingUser._id,this.httpOptions);
  }
}
