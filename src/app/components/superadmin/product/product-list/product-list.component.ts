import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FeatureList } from '../../../../shared/model/featureList';
import { ShopSubmenu } from '../../../../shared/model/shopSubmenu';
import { ErrorhandlerService } from '../../../../shared/services/errorhandler.service';
import { PagerService } from '../../../../shared/services/pager.service';
import { ProductService } from '../../../../shared/services/product.service';
import { Pagination } from '../../../../shared/utils/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  modaltitle = 'Add Product';
  breadcrumb = ['Dashboard', 'Admin', 'Product List'];
  startNumber = 1;
  pageSize = 10;
  productList: any[] = [];
  filterText = '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10, 20, 30];
  sortProperty: string = 'id';
  sortOrder = 1;
  tableColumns = ['SNo.', 'Date', 'Feature', 'Title', 'Description', 'Category', 'Sub Category', 
                  'Actual Price', 'Discount Price', 'Is Available', 'Url', 'Image', 'Edit', 'Delete']
  formDataInput: any;
  productForm!: FormGroup;
  submitted: boolean = false;
  public visible = false;
  formattedaddress: any;
  options: any;
  categoryList = ShopSubmenu;
  featureList = FeatureList;
  selectedFile: any[] = [];
  selectedFileName = "";
  user = JSON.parse(localStorage.getItem('user'));
  submitBtnText = 'Submit';
  imageUrl = '';
  @Input() formData: any;
  productId: any = '0';
  prodctImages :any[] = [];
  pagination = Pagination;
   filterPayload :any;
  @ViewChild('closeProductModal') closeProductModal!:ElementRef;
  // convenience getter for easy access to form fields
  get p() { return this.productForm.controls; };

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router,
    private errHandler: ErrorhandlerService, private toastrService: ToastrService, private filterService : PagerService) {
    this.productForm = this.fb.group({
     // _id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      sku: ['', Validators.required],
      category: ['', Validators.required],
      categoryId : [],
      subCategory: ['', Validators.required],
      displayType: ['', Validators.required],
      featureTypeId : ['', Validators.required],
      actualPrice:['', Validators.required],
      discountPrice:['', Validators.required],
      deliveryType : ['', Validators.required],
      availability: ['', Validators.required],
      url: ['', Validators.required],
      isActive: [true],
      imageurl: ['']

    })

  }


  ngOnInit(): void {
    this.getProducts();

  }

  getProducts() {
    let filterCondition:any = {};
    this.filterPayload = this.filterService.GetFilterConditionPagination(filterCondition,this.pagination.pageSize, this.pagination.startNumber)
    this.productService.listOfProducts(this.filterPayload).subscribe({next: (data: any) => {
        if (data.status == 200) {
          let result = data.data
          //.map((item: any) => ({ ...item, modeofteaching: JSON.parse(item.modeofteaching) }))
          this.productList = result;
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

  handlePageChange(event: number) {
    // console.log(event)
     this.currentPage = event;
     this.pagination.startNumber = event;
     this.getProducts();


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
    //      //console.log(err)
    //  })
  }

  searchProduct(event: any) {
  this.pagination.startNumber = 1;
  let filterCondition:any = {};
  filterCondition.categoryId = this.filterText;
  this.filterPayload = this.filterService.GetFilterConditionPagination(filterCondition,this.pagination.pageSize, this.pagination.startNumber);
  this.productService.search(this.filterPayload).subscribe({next: (data: any) => {
        if (data.status == 200) {
          let result = data.data
          //.map((item: any) => ({ ...item, modeofteaching: JSON.parse(item.modeofteaching) }))
          this.productList = result;
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

  openProductModal(){
    this.modaltitle = "Add Product";
    this.submitBtnText = 'Save';
    this.submitted = false;
    this.productForm.reset();
    this.productForm.markAsUntouched();
    this.productForm.markAsPristine();
    this.productForm.patchValue({isActive: true, subCategory: '-', url: '-',
       availability:1, deliveryType : 'free delivery'});
    this.productId = '0';

  }


  fetchCityList(value: any) {
    let cityList = this.categoryList.filter((x: any) => x.name == value);
    // this.cityList = cityList[0].cities
    // // //console.log('City', this.cityList)
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
      //console.log(event.target.files)
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.selectedFile = event.target.files
        //console.log(this.selectedFile)
        var reader = new FileReader();
        // reader.onload = (event: any) => {
        //   //console.log(event.target.result);
        //   this.urlsp.push(event.target.result);
        // }
      }

      // let file = event.target.files[0];
      // this.selectedFile = file;
      // this.selectedFileName = file.name.replace(/ /g, "_");
      // this.fileUploadError = '';
    }

  }

  reuploadImage() {
    this.imageUrl = '';

  }

  getCategoryId(id:any){
   let [catName] = this.categoryList.filter((x:any) => x.id == id)
   this.productForm.controls['category'].setValue(catName.label);
   //console.log(this.productForm.value)
  }

  submit() {
    this.submitted = true;
    //console.log(this.productForm.value);
    if (this.productForm.valid) {
      let payload = this.productForm.value;
      let formData = new FormData();
      return
      Object.entries(payload).forEach(([key, value]) => { 
        if(payload.imageurl != null){
          formData.append(key, (value).toString());
        }else{
          this.toastrService.error('Please upload images')
        }
      });
      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('image', this.selectedFile[i], this.selectedFile[i].name.replace(/ /g, "_"));
      }

      if (this.productId == '0') {
        this.productService.createProduct(formData).subscribe({
          next: (data: any) => {
            if (data.status == 200) {
              this.closeProductModal.nativeElement.click();
              //  $('#parentModal').modal('show')
              this.getProducts();
              this.toastrService.success('Product saved successfully')
            }

          }, error: ((err: any) => {
            let error = this.errHandler.handleError(err);
            ////console.log(error)
            if (error.status == 401) {
              this.toastrService.error('Token Expired');
            }
            if (error.status == 500) {
              this.toastrService.error('Server Error.Failed to add parent');
            }

          })
        })
      } else {
        this.productService.updateProduct(this.productId, formData).subscribe({
          next: (data: any) => {
            if (data.status == 200) {
              //  $('#parentModal').modal('show')
              this.getProducts();
              this.closeProductModal.nativeElement.click();
              this.toastrService.success('Product updated successfully')
            }

          }, error: ((err: any) => {
            let error = this.errHandler.handleError(err);
            ////console.log(error)
            if (error.status == 401) {
              this.toastrService.error('Token Expired');
            }
            if (error.status == 500) {
              this.toastrService.error('Server Error.Failed to update parent');
            }

          })
        })
      }

    } else {
      return;
    }

  }

  action(item: any, type: any) {
    if (type == 'view') {
      this.modaltitle = 'Product Images';
        this.prodctImages = item.storageurlArr;
    }
    if (type == 'edit') {
      //console.log(item)
      this.modaltitle = 'Edit Product';
      this.submitBtnText = 'Update';
      this.productId = item._id;
      this.productForm.patchValue({
        //_id: item._id,
        title: item.title,
        description: item.description,
        sku: item.sku,
        category: item.category,
        categoryId: item.categoryId,
        subCategory: item.subCategory,
        displayType: item.displayType,
        featureTypeId : Number(item.featureTypeId),
        actualPrice:item.actualPrice,
        discountPrice:item.discountPrice,
        deliveryType : item.deliveryType,
        availability: item.availability,
        url: item.url,
        isActive: item.isActive,
        imageurl : item.imageurl
      })
    }
    if (type == 'delete') {
      this.modaltitle = 'Delete Product';
      this.productId = item._id;

    }
  }

  deleteProduct(){
    this.productService.deleteProduct(this.productId).subscribe({next: (data:any)=>{
      if(data.status == 200){
        this.toastrService.success('Product Deleted successfully!');
        this.closeProductModal.nativeElement.click();
        this.getProducts();
      }      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      ////console.log(error)
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

