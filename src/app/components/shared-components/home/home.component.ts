import { Component, OnInit } from '@angular/core';
import { ParentReview } from '../../../shared/model/parentreview';
import { HomeSlide } from '../../../shared/model/homecarousel';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { ProductService } from '../../../shared/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  slides = HomeSlide;
  reviewCarousel : any[]=ParentReview;
  products!: any[];
  responsiveOptions!: any[];
  images!: any[];
  productList: any[] = [];
  newestProductList: any[] = [];
  bestSellingProductList: any[] = [];
  featuredProductList: any[] = [];

  constructor(private userService: UserService, private productService: ProductService,
    private errHandler: ErrorhandlerService, private toastrService: ToastrService) {
    }

  ngOnInit() {
      this.getProducts();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  customCOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  getProducts() {
    // let payload: any = {};
    // payload.pagination = this.pagination;
    this.productService.listOfProducts(null).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          let result = data.data;
          this.productList = result;
          
          this.bestSellingProductList = result.filter((item: any) => item.featureTypeId == "0");
          this.newestProductList = result.filter((item: any) => item.featureTypeId == "1");
          this.featuredProductList = result.filter((item: any) => item.featureTypeId == "2");

          console.log(this.bestSellingProductList)
       
        
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
          this.toastrService.error('Server Error.Failed to fetch list');
        }

      })
    })
  }

  




}
