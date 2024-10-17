import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { PagerService } from '../../../../app/shared/services/pager.service';
import { ContactService } from '../../../../app/shared/services/contact.service';

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
  


  constructor(private fb : FormBuilder,private router : Router, private errHandler : ErrorhandlerService,private filterService : PagerService,
              private toastrService : ToastrService,private _fb: FormBuilder, private cService: ContactService){ 
                
              }


  ngOnInit(): void {
    this.getEnquiryList();
    this.getRouteDetails();
  }

  getRouteDetails(){
    this.breadcrumb = this.router.url.replace('/','');
    this.breadcrumb = this.breadcrumb.split('/');
  }

  getEnquiryList(){
    this.payload.startNumber = 1;
    this.payload.pageSize = 10;
    let role = 'subadmin';
    //let filter = this.filterService.GetFilterConditionPagination('role', 'subadmin',this.payload.pageSize, this.payload.startNumber )
    this.cService.getAll(null).subscribe({next: (data:any)=>{
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
    // console.log(event)
    //  this.currentPage = event;
    //  this.filterPayload.pageNumber = event;
    //  this.getTeachersList();
   
     
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
 
  searchTeacher(text:any){

  }

  deleteAdmin(item){
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
