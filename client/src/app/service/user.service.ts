import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private authToken: any = null;

  //private endpoint = 'http://localhost:3000/api/Users';
  private endpoint = 'https://galaxy-x.herokuapp.com/api/Users';

  private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  constructor(private http: HttpClient) { }

  public getList(): Observable<any>{
    this.loadToken();
    return this.http.get<any>(this.endpoint,this.httpOptions);
  }

  public addUser(addingUser: User): Observable<any>{
    this.loadToken();
    return this.http.post<any>(this.endpoint + '/add',addingUser, this.httpOptions);
  }

  public deleteUser(addingUser: User): Observable<any>{
    this.loadToken();
    return this.http.get<any>(this.endpoint + '/delete/' + addingUser._id,this.httpOptions);
  }

  private loadToken(){
    /* *
    * The set() method of the Headers interface sets a new value for an existing header inside 
    * a Headers object, or adds the header if it does not already exist.
    * 
    * The difference between set() and Headers.append is that if the specified header already 
    * exists and accepts multiple values, set() overwrites the existing value with the new one, 
    * whereas Headers.append appends the new value to the end of the set of values.
    */
     
    this.authToken = localStorage.getItem('id_token');
    this.httpOptions.headers = this.httpOptions.headers.set('authorization',this.authToken);
  }
}
