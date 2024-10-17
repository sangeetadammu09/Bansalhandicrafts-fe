import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { Pagination } from '../../../shared/utils/pagination';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  pagination = Pagination;
  productList: any[] = [];

  constructor(private productService: ProductService, private router : Router,private toastr :ToastrService,
   private fb : FormBuilder,private errHandler: ErrorhandlerService, private toastrService: ToastrService) {
    
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    let payload: any = {};
    payload.pagination = this.pagination;
    this.productService.productById('1',payload).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          let result = data.data
          //.map((item: any) => ({ ...item, modeofteaching: JSON.parse(item.modeofteaching) }))
          this.productList = result;
          //console.log(result)
          // this.bestSellingProductList = result.filter((item: any) => item.featureType == "0");
          // this.newestProductList = result.filter((item: any) => item.featureType == "1");
          // this.featuredProductList = result.filter((item: any) => item.featureType == "2");
       
        
        }

      }, error: ((err: any) => {
        let error = this.errHandler.handleError(err);
        //console.log(error)
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


  onTableDataChange(event: any) {
    this.page = event;
    this.getProducts();
  }
}
