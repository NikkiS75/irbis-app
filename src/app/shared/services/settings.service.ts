import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client, Diagnosis, fbCreateResponse, Materials, Services} from '../interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {
  }


  createDiagnosis(diagnosis: Diagnosis): Observable<Diagnosis>{
    return this.http.post(`${environment.fbDbUrl}/diagnosis.json`, diagnosis).pipe(
      map((response:fbCreateResponse) => {
        return {
          ...diagnosis,
          id: response.name
        }
      })
    )
  }

  getAllDiagnosis(): Observable<Diagnosis[]> {
    return this.http.get(`${environment.fbDbUrl}/diagnosis.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
        return [];
      }));
  }


  createMaterial(material: Materials): Observable<Materials>{
    return this.http.post(`${environment.fbDbUrl}/materials.json`, material).pipe(
      map((response:fbCreateResponse) => {
        return {
          ...material,
          id: response.name
        }
      })
    )
  }

  getAllMaterials(): Observable<Materials[]> {
    return this.http.get(`${environment.fbDbUrl}/materials.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
        return [];
      }));
  }

  createService(service: Services): Observable<Services>{
    return this.http.post(`${environment.fbDbUrl}/services.json`, service).pipe(
      map((response:fbCreateResponse) => {
        return {
          ...service,
          id: response.name
        }
      })
    )
  }

  getAllServices(): Observable<Services[]> {
    return this.http.get(`${environment.fbDbUrl}/services.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }));
        return [];
      }));
  }

}
