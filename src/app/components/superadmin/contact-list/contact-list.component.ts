import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { PagerService } from '../../../../app/shared/services/pager.service';
import { ContactService } from '../../../../app/shared/services/contact.service';
import { Pagination } from '../../../shared/utils/pagination';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent{
  title = 'Enquiry List';
  breadcrumb :any;
  startNumber = 1;
  pageSize = 10;
  payload :any = {};
  enquiryList :any[] = [];
  filterText= '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10,20,30];
  sortProperty: string = 'id';
  sortOrder = 1;
  tableColumns = ['SNo.','Reg.Date','Name', 'Email', 'Contact', 'Subject','Description', 'Delete'];
  registerForm :FormGroup;
  adminData: any;
  subAdminLabel: string = '';
  get f() { return this.registerForm.controls};
  submitted = false;
  registerText = 'Submit';
  passwordMatchText:string = '';
  togglePasswordIcon: boolean = false;
  @ViewChild('inputpassword') inputpassword!:ElementRef;
   @ViewChild('closeAddAdminModal') closeAddAdminModal!:ElementRef;
   pagination = Pagination;
   filterPayload :any;

   constructor(private fb : FormBuilder,private router : Router, private errHandler : ErrorhandlerService,private filterService : PagerService,
              private toastrService : ToastrService,private _fb: FormBuilder, private cService: ContactService){}


  ngOnInit(): void {
    this.getEnquiryList();
    this.getRouteDetails();
  }

  getRouteDetails(){
    this.breadcrumb = this.router.url.replace('/','');
    this.breadcrumb = this.breadcrumb.split('/');
  }

  getEnquiryList(){
    let filterCondition:any = {};
    this.filterPayload = this.filterService.GetFilterConditionPagination(filterCondition,this.pagination.pageSize, this.pagination.startNumber)
    this.cService.getAll(this.filterPayload).subscribe({next: (data:any)=>{
      if(data.status == 200){
       // console.log(data.data)
        this.enquiryList = data.data;
      }
      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this.toastrService.error('Token Expired');
      }
      if(error.status == 500){
       this.toastrService.error('Server Error.Failed to fetch teachers list');
      }
      
   })})
  }

  handlePageChange(event: number){
    this.currentPage = event;
    this.pagination.startNumber = event
    this.getEnquiryList();
   
     
  }
 
  onTableSizeChange(event: any): void {
  //  this.itemsPerPage = event.target.value;
  //  this.filterPayload.pageSize = event.target.value;
  //    this.userService.getManagers(this.filterPayload).subscribe((data:any) => {
  //      if(data.APIResponse.data.length > 0){
  //        let users= data.APIResponse.data;
  //        this.managerList = users;
  //        this.totalItems = data.TotalCount;
  //       }else{
  //         this.managerList = [];
  //       }   
  //  },(err:HttpErrorResponse) => {
  //      console.log(err)
  //  })
 }
 
 searchContact(text:any){
  this.pagination.startNumber = 1;
  let filterCondition:any = {};
  filterCondition.contact = text;
  this.filterPayload = this.filterService.GetFilterConditionPagination(filterCondition,this.pagination.pageSize, this.pagination.startNumber);
  this.cService.search(this.filterPayload).subscribe({next: (data: any) => {
      if (data.status == 200) {
        let result = data.data;
        this.enquiryList = result;
        this.totalItems = data.total; 
      }

    }, error: ((err: any) => {
      let error = this.errHandler.handleError(err);
      ////console.log(error)
      if (error.status == 401) {
        this.toastrService.error('Token Expired');
      }
      if (error.status == 400) {
        this.toastrService.error('Please enter valid input');
      }
      if (error.status == 500) {
        this.toastrService.error('Server Error.Failed to fetch teachers list');
      }

    })
  })
  }

  deleteContact(item){
    this.adminData = item;

  }

  confirmDelete(){
    this.cService.delete(this.adminData._id).subscribe({next: (data:any)=>{
      if(data.status == 200){
        this.toastrService.success('Enquiry Deleted successfully!');
        this.getEnquiryList();
      }      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this.toastrService.error('Token Expired');
      }
      if(error.status == 400) {
        this.toastrService.error('Please Enter All the Mandatory Fields!');
       }
      if(error.status == 500){
       this.toastrService.error('Server Error.Failed to register');
      }
      
   })})
  }


  
}
