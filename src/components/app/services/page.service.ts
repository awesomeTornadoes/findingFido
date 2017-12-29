import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private scheduleUrl = 'http://localhost:9000/schedule';  
  private locationsUrl = 'http://localhost:9000/locations'

  constructor(
    private http: Http,
    public authHttp: AuthHttp
  ) { }

  postSchedule(schedule: any): Promise<any> {
    return this.authHttp
      .post(this.scheduleUrl, JSON.stringify(schedule), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getLocations(): Promise<any> {
    return this.authHttp.get(this.locationsUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


