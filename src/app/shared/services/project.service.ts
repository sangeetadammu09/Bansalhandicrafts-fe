import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from '../utils/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  createProject(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Project.form,data)
  }

  listOfProjects(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Project.list,data)
  }

  search(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Project.search,data)
  }

  productById(_id:string,data:any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Project.id+_id,data)
  }

  updateProject(_id:string,data: any){
    return this._http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Project.update+_id,data)
  }
  
  deleteProject(_id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Project.delete+_id)
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
