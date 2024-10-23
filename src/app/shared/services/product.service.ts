import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from '../utils/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  createProduct(parent: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.form,parent)
  }

  listOfProducts(pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.list,pagination)
  }

  search(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.search,data)
  }

  productById(_id:string, pagination:any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.id+_id,pagination)
  }

  updateProduct(_id:string,parent: any){
    return this._http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.update+_id, parent)
  }
  
  deleteProduct(_id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Product.delete+_id)
  }

  // feedback
  createFeedback(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.create,data)
  }

  listofFeedbacks(pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.listoffeedbacks,pagination)
  }

  listofFeedbackbyParentid(id:any,pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.listbyproductid+id,pagination)
  }

  updateFeedback(data: any){
    return this._http.put<any>(APP_DI_CONFIG.dataDomain+APP_DI_CONFIG.endPoints.Feedback.update,data)
  }
  
  deleteFeedback(_id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.delete+_id)
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
