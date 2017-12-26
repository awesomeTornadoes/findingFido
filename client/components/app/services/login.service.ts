/*@Injectable()
class MyService() {}
Declares that a class has dependencies that should be injected into the constructor 
when the dependency injector is creating an instance of this class.*/

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private loginUrl = '/login';  
  private signupUrl = '/signup';

  constructor(private http: Http) { }

  postLogin(user: any): Promise<any> {
    return this.http
      .post(this.loginUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


