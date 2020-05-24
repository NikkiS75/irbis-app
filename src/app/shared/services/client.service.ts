import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, fbCreateResponse, Pet} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  create(client: Client): Observable<Client>{
    return this.http.post<Client>(`${environment.fbDbUrl}/client.json`, client).pipe(
      map((response:fbCreateResponse) => {
        return {
          ...client,
          id: response.name
        }
      })
    )
  }

  getAll(): Observable<Client[]>{
    return this.http.get(`${environment.fbDbUrl}/client.json`)
      .pipe(map((response:{[key: string]:any})=>{
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))
          return[]
      }))
  }

  getById(id:string): Observable<Client>{
    return this.http.get(`${environment.fbDbUrl}/client/${id}.json`)
      .pipe(map((client:Client)=>{
        return{
          ...client, id
        }}))

  }
  update(client:Client):Observable<Client>{
      return this.http.patch<Client>(`${environment.fbDbUrl}/client/${client.id}.json`, client)
  }




}
