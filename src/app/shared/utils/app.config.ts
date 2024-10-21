import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls -  ',http://localhost:8080/http://13.202.237.226:8080
  parentDomain: 'https://bansalhandicraftbe-a5hjfxghe8arbaaq.eastasia-01.azurewebsites.net/',
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
      productbyid : "product/listofid/",
      search : "product/search",
      checkphoneemail : "product/check/",
      productupdate : "product/update/",
      productdelete : "product/delete/"
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