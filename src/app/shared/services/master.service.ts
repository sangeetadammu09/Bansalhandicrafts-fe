import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminMenuList } from '../../../assets/menus/menu';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  menuData = AdminMenuList.data;
  payloadData : any;
  
  private userSource = new BehaviorSubject(null);
  currentuserDetails = this.userSource.asObservable();

  sendUserDetails(user: any) {
    this.userSource.next(user);
  }

  isLoggedIn(){
    return localStorage.getItem('userToken') != null;
  }

  //menu service
  sendMenu(menu:any){
    this.menuData = menu;
  }

  getMenu(){
    return this.menuData;
  }

  sendData(data:any){
    this.payloadData = data;
  }

  getData(){
    return this.payloadData;
  }

}
