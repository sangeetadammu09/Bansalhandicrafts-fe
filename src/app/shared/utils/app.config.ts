import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls -
  //parentDomain: 'https://bansalhandicraftbe-a5hjfxghe8arbaaq.eastasia-01.azurewebsites.net/',
  parentDomain: 'http://localhost:8080/',
  endPoints: {
    Admin:{
      login : "admin/login",
      register : "admin/register", 
      adminbyid : "admin/",
      update : "admin/update/",
      delete : "admin/delete/",
      all : "admin/all",
      search : "admin/search",
    },
    Common:{
      login : "login",
      register : "register", 
      userbyid : "user/",
      update : "user/update/",
      search : "user/search",
    },
    Feedback:{
      create : "feedback/add", 
      list: "feedback/listoffeedbacks",
      listbyproductid : "feedback/listoffeedbacksbyproductid/",
      update : "feedback/update",
      delete : "feedback/delete",
    },
    Product:{
      form : "product/form",
      list : "product/list",
      id : "product/listofid/",
      search : "product/search",
      update : "product/update/",
      delete : "product/delete/"
    },
    Exhibition:{
      form : "exhibition/form",
      list : "exhibition/list",
      id : "exhibition/listofid/",
      search : "exhibition/search",
      update : "exhibition/update/",
      delete : "exhibition/delete/"
    },
    Project:{
      form : "project/form",
      list : "project/list",
      projectbyid : "project/listofid/",
      search : "project/search",
      update : "project/update/",
      delete : "project/delete/"
    },   
    Mail:{
        contact : "mail/contact",
        product : "mail/product",
        teacher : "mail/teacher",
        appliedteacher : "mail/appliedteacher",
    },
    Contact: {
        add : "contact/form",
        list: "contact/listofcontact",
        update : "contact/update",
        delete : "contact/delete/",
        search : "contact/search",
    }


    
  }
  
};

@NgModule({
})
export class AppConfigModules {}