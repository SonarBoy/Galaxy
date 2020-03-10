import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private authToken: any = null;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  }

  private endpoint = 'http://localhost:3000/api/User';


  constructor(private http: HttpClient) { 
    this.user = new User();
  }

  public getList(): Observable<any>{
    this.loadToken();
    return this.http.get<any>(this.endpoint,this.httpOptions);
  }

  public addUser(addingUser): Observable<any>{
    this.loadToken();
    return this.http.get<any>(this.endpoint + '/add',this.httpOptions);
  }

  public getUser(addingUser):Observable<any>{
    this.loadToken();
    return this.http.get<any>(this.endpoint + '/edit/' + addingUser._id,this.httpOptions);
  }

  public editUser(addingUser:User):Observable<any>{
    this.loadToken();
    return this.http.post<any>(this.endpoint + '/edit/' + addingUser._id,addingUser,this.httpOptions);
  }

  public deleteUser(addingUser: User):Observable<any>{
    this.loadToken();
    return this.http.get<any>(this.endpoint + '/delete' + addingUser._id,this.httpOptions );
  }



  private loadToken(){

    /*
    The getItem() method of the Storage interface, when passed a key name, will 
    return that key's value, or null if the key does not exist, in the given 
    Storage object.
    */

    this.authToken = localStorage.getItem('id_token');
    this.httpOptions.headers = this.httpOptions.headers.set('authorization',this.authToken);
  }

}
