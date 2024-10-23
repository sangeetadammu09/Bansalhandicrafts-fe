import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from '../utils/app.config';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionService {

  constructor(private _http: HttpClient) { }

  createExhibition(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Exhibition.form,data)
  }

  listOfExhibition(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Exhibition.list,data)
  }

  search(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Exhibition.search,data)
  }

  exhibitionById(_id:string, data:any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Exhibition.id+_id,data)
  }

  updateExhibition(_id:string,data: any){
    return this._http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Exhibition.update+_id,data)
  }
  
  deleteExhibition(_id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Exhibition.delete+_id)
  }


   //Helper Methods

   setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
