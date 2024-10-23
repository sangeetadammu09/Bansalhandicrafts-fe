import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopSubmenu } from '../../../shared/model/shopSubmenu';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { PagerService } from '../../../shared/services/pager.service';
import { Pagination } from '../../../shared/utils/pagination';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
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

  constructor(private projectService: ProjectService, private activateRouter : ActivatedRoute,private toastr :ToastrService,
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
    this.projectService.search(this.filterPayload).subscribe({next: (data: any) => {
          if (data.status == 200) {
            let result = data.data;
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