import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client, fbCreateResponse, Pet} from '../interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) {}
  create(pet: Pet): Observable<Pet>{
    return this.http.post<Pet>(`${environment.fbDbUrl}/pet.json`, pet).pipe(
      map((response:fbCreateResponse) => {
        return {
          ...pet,
          id: response.name

        }
      })
    )
  }

  getAll(): Observable<Pet[]>{
    return this.http.get(`${environment.fbDbUrl}/pet.json`)
      .pipe(map((response:{[key: string]:any})=>{
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))
        return[]
      }))


  }
  getById(id:string): Observable<Pet>{
    return this.http.get(`${environment.fbDbUrl}/pet/${id}.json`)
      .pipe(map((pet:Pet)=>{
        return{
          ...pet, id
        }}))

  }

  update(pet:Pet):Observable<Pet>{
    return this.http.patch<Pet>(`${environment.fbDbUrl}/pet/${pet.id}.json`, pet)
  }


}

