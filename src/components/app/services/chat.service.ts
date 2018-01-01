import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private chatUrl = 'http://localhost:9000/chat';

  constructor(
    private http: Http,
    public authHttp: AuthHttp
  ) { }


  postMessage(message: any): Promise<any> {
    return this.authHttp
      .post(this.chatUrl, JSON.stringify(message), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getMessages(email: any, room: any): Promise<any> {
    return this.authHttp
      .get(`${this.chatUrl}/${email}/${room}`, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
 

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}



