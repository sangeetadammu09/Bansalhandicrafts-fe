import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { AdminService } from '../../../../app/shared/services/admin.service';
import { PagerService } from '../../../../app/shared/services/pager.service';
import { Pagination } from '../../../shared/utils/pagination';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent {
  title = 'Admin List';
  breadcrumb :any;
  startNumber = 1;
  pageSize = 10;
  payload :any = {};
  subAdminList :any[] = [];
  filterText= '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10,20,30];
  sortProperty: string = 'id';
  sortOrder = 1;
  tableColumns = ['SNo.','Reg.Date','Status','Name', 'Location', 'Role', 'Location Assigned','Handling Locations','Edit', 'Delete'];
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
              private toastrService : ToastrService,private _fb: FormBuilder, private adminService: AdminService){ 
                this.registerForm = this._fb.group({
                  firstname : ['Sangeeta', Validators.required],
                  lastname : ['Dammu', Validators.required],
                  email : ['sangeetadammu12@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
                  mobile : ['8332895856', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
                  role : ['subadmin'],
                  location: ['Bangalore', Validators.required],
                  sociallinks:  ['empty'],
                  password : ['Sangeeta@123', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
                  cpass : ['Sangeeta@123', Validators.required],    
                  isActive : [true],
                  islocationassigned : [false],
                  locationassignednames : ['Bangalore'],
                 // url: ['empty'],
               })
              }


  ngOnInit(): void {
    this.getSubAdminList();
    this.getRouteDetails();
  }

  getRouteDetails(){
    this.breadcrumb = this.router.url.replace('/','');
    this.breadcrumb = this.breadcrumb.split('/');
  }

  getSubAdminList(){
    let filterCondition:any = {};
    filterCondition.role = 'subadmin';
    this.filterPayload = this.filterService.GetFilterConditionPagination(filterCondition,this.pagination.pageSize, this.pagination.startNumber)
    this.adminService.getAllAdmins(this.filterPayload).subscribe({next: (data:any)=>{
      if(data.status == 200){
       // console.log(data.data)
        this.subAdminList = data.data;
        this.totalItems = data.total;
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
     this.currentPage = event;
     this.pagination.startNumber = event
     this.getSubAdminList();
   
     
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
 
 searchAdmin(text:any){
  this.pagination.startNumber = 1;
  let filterCondition:any = {};
  filterCondition.mobile = text;
  filterCondition.role = 'subadmin';
  this.filterPayload = this.filterService.GetFilterConditionPagination(filterCondition,this.pagination.pageSize, this.pagination.startNumber);
  this.adminService.getAllAdmins(this.filterPayload).subscribe({next: (data: any) => {
      if (data.status == 200) {
        let result = data.data;
        this.subAdminList = result;
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

   
  togglePassword(){
    this.togglePasswordIcon = !this.togglePasswordIcon;
    if(this.togglePasswordIcon){ 
      this.inputpassword.nativeElement.setAttribute("type", 'text');
    }else{
      this.inputpassword.nativeElement.setAttribute("type", 'password');
    }
  
  }

  openSubAdminModal(){
    this.subAdminLabel = 'Add Sub Admin';
   // this.registerForm.reset();
    this.registerForm.patchValue({
      role : 'subadmin',
      islocationassigned : false,
      isActive : 'true',
      sociallinks : 'empty',
      locationassignednames : '',
     // url: 'empty'

    })
   


  }

  updateAdmin(item:any){
    this.subAdminLabel = 'Edit Sub Admin';
    this.adminData = item;
      this.registerText = 'Update';
        this.registerForm.patchValue({
          firstname : item.firstname,
          lastname : item.lastname,
          email : item.email,
          mobile : item.mobile,
          role : item.role,
          location: item.location,
          isActive : item.isActive.toString(),
          password: item.password,
          cpass : item.cpass,
          islocationassigned : item.islocationassigned,
          locationassignednames : item.locationassignednames,
        })
  }

  addSubAdmin(){
    this.submitted = true;
      if(this.registerForm.valid){
        let payload = this.registerForm.value;
       
        let formData = new FormData();
        
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, (value).toString());
        });
        if(this.adminData){
          this.adminService.update(this.adminData._id,formData).subscribe({next: (data:any)=>{
            if(data.status == 200){
              this.toastrService.success('Sub Admin Updated successfully!');
              this.closeAddAdminModal.nativeElement.click();
              this.getSubAdminList();
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

        }else{
          this.adminService.register(formData).subscribe({next: (data:any)=>{
            if(data.status == 200){
              this.closeAddAdminModal.nativeElement.click();
              this.toastrService.success('Sub Admin Registered successfully!');
              this.getSubAdminList();
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
    //  formData.append('image', this.selectedFile, this.selectedFileName);

         
      }else{
        return;
       
      }
  }



  deleteAdmin(item){
    this.adminData = item;

  }

  confirmDelete(){
    this.adminService.delete(this.adminData._id).subscribe({next: (data:any)=>{
      if(data.status == 200){
        this.toastrService.success('Sub Admin Deleted successfully!');
        this.getSubAdminList();
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
