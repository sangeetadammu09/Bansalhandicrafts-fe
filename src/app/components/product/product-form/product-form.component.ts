import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonService } from '../../../shared/services/common.service';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { MasterService } from '../../../shared/services/master.service';
import { ShopSubmenu } from '../../../shared/model/shopSubmenu';
import { ProductService } from '../../../shared/services/product.service';

declare var $: any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm!: FormGroup;
  submitted: boolean = false;
  public visible = false;
  formattedaddress: any;
  options: any;
  parentData :any;
  categoryList = ShopSubmenu;
  selectedFile: any[] = [];
  tuitionData :any;
  selectedFileName = "";
  user = JSON.parse(localStorage.getItem('user'));
  submitBtnText = 'Submit';
  imageUrl = '';
  @Input() formData: any;

  // convenience getter for easy access to form fields
  get p() { return this.productForm.controls; };

  constructor(private fb: FormBuilder, private productService: ProductService,private commonService: CommonService,
    private authService: AuthService, private router: Router, private errHandler: ErrorhandlerService,
    private _toastrService: ToastrService, private masterService: MasterService) {
    this.productForm = this.fb.group({
      id: [''],
      title: ['Agate stone', Validators.required],
      description: ['this is test description', Validators.required],
      sku: ['1234', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      displayType: ['price', Validators.required],
      price: ['200', Validators.required],
      url: ['none', Validators.required],
      isActive : [true],
      imageurl: ['']

    })

    console.log(this.masterService.getData())
    console.log('i am here')
  }

 

  ngOnInit(): void {
    console.log('i am here')

  }


  fetchCityList(value:any){
    let cityList = this.categoryList.filter((x:any)=> x.name == value);
    // this.cityList = cityList[0].cities
    // // console.log('City', this.cityList)
    //  if(cityList[0].union == true){
    //   this.disableSelectCityField = true;
    //   this.productForm.controls['city'].setValue('')
    //  // this.productForm.get('city').disable();
    // }else{
    //   //this.productForm.get('city').enable();
    //   this.disableSelectCityField = false;

    //   }
     
  }


  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files)
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.selectedFile = event.target.files
        console.log(this.selectedFile)
        var reader = new FileReader();
        // reader.onload = (event: any) => {
        //   console.log(event.target.result);
        //   this.urlsp.push(event.target.result);
        // }
      }

      // let file = event.target.files[0];
      // this.selectedFile = file;
      // this.selectedFileName = file.name.replace(/ /g, "_");
      // this.fileUploadError = '';
    }

  }

  reuploadImage(){
    this.imageUrl = '';

  }

  submit() {
    this.submitted = true;
    console.log(this.productForm.value);
    if (this.productForm.valid){
      let payload = this.productForm.value;
      let formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, (value).toString());
  
      });
      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('image', this.selectedFile[i], this.selectedFile[i].name.replace(/ /g, "_"));
      }
     // let id = this.productForm.controls['_id'].value;
      if(this.tuitionData == undefined){
     // formData.delete('_id');   
      this.productService.createProduct(formData).subscribe({next: (data: any) => {
          if (data.status == 200) {
          //  $('#parentModal').modal('show')
            this._toastrService.success('Product saved successfully')
          }

        }, error: ((err: any) => {
          let error = this.errHandler.handleError(err);
          //console.log(error)
          if (error.status == 401) {
            this._toastrService.error('Token Expired');
          }
          if (error.status == 500) {
            this._toastrService.error('Server Error.Failed to add parent');
          }

        })
      })
     }else{
      
      this.productService.updateProduct(this.tuitionData._id,formData).subscribe({next: (data: any) => {
          if (data.status == 200) {
          //  $('#parentModal').modal('show')
            this.router.navigate(['/dashboard/parent/parent-history'])
            this.authService.parentEmail(payload).subscribe((data: any) => {
              console.log(data, 'email')
            });
            this._toastrService.success('Your details are updated successfully')
          }

        }, error: ((err: any) => {
          let error = this.errHandler.handleError(err);
          //console.log(error)
          if (error.status == 401) {
            this._toastrService.error('Token Expired');
          }
          if (error.status == 500) {
            this._toastrService.error('Server Error.Failed to update parent');
          }

        })
      })
     }

    } else {
      return;
    }

  }


  closeParentConfimModal() {
    $('#parentModal').modal('hide')
   // this.router.navigate(['/'])
  }


}

