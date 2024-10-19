import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { Pagination } from '../../../shared/utils/pagination';
import { ProductService } from '../../../shared/services/product.service';
import { PagerService } from '../../../shared/services/pager.service';
import { ShopSubmenu } from '../../../shared/model/shopSubmenu';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  page: number = 1;
  productList: any[] = [];
  productId: string;
  pagination = Pagination;
  filterPayload :any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  categoryList = ShopSubmenu;
  shopProductName: any;

  constructor(private productService: ProductService, private activateRouter : ActivatedRoute,private toastr :ToastrService,
   private fb : FormBuilder,private errHandler: ErrorhandlerService, private toastrService: ToastrService, private filterService : PagerService) {
   }

  ngOnInit(): void {
  this.getProductIdfromRoute();

    
  }

  getProductIdfromRoute(){ 
    this.activateRouter.paramMap.subscribe(params => {    
      if(params){   
       this.productId = params.get('id');
       let [result] = this.categoryList.filter((x:any) => x.id == this.productId);
       this.shopProductName = result;
       this.getProducts(this.productId);
      }    
     });

    
 
  }

  getProducts(id:any){
    let payload: any = {};
    payload.pagination = this.pagination;
    this.pagination.startNumber = 1;
    let filterCondition:any = {};
    filterCondition.categoryId = id;
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
            this.toastrService.error('Server Error.Failed to fetch product list');
          }
  
        })
      })
  }


  handlePageChange(event: number) {
    // console.log(event)
     this.currentPage = event;
     this.pagination.startNumber = event;
     this.getProducts(this.productId);


  }
}
