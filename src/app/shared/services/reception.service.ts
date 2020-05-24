import {Injectable} from '@angular/core';
import {Client, fbCreateResponse, Reception} from '../interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http: HttpClient) {
  }


  createReception(reception: Reception): Observable<Reception> {
    return this.http.post(`${environment.fbDbUrl}/reception.json`, reception)
      .pipe(
      map((response: fbCreateResponse) => {
        return {
          ... reception,
          id: response.name,
          date: new Date(reception.date),
        }
      })
    )
  }

  getAllReception(): Observable<Reception[]>{
    return this.http.get(`${environment.fbDbUrl}/reception.json`)
      .pipe(map((response:{[key: string]:any})=>{
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        return[]
      }))
  }
}
