import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/utils/shared.module';
import { AboutComponent } from './shared-components/about/about.component';
import { ContactComponent } from './shared-components/contact/contact.component';
import { HomeComponent } from './shared-components/home/home.component';
import { RegisterComponent } from './shared-components/register/register.component';
import { LoginComponent } from './shared-components/login/login.component';
import { AdminDetailsComponent } from './superadmin/admin-details/admin-details.component';
import { PaymentDetailsComponent } from './superadmin/payment-details/payment-details.component';
import { AdminListComponent } from './superadmin/admin-list/admin-list.component';
import { PageTitleComponent } from './shared-components/page-title/page-title.component';
import { FeedbackListComponent } from './superadmin/feedback-list/feedback-list.component';
import { ContactListComponent } from './superadmin/contact-list/contact-list.component';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';
import { ShopComponent } from './shared-components/shop/shop.component';
import { ExhibitionComponent } from './shared-components/exhibition/exhibition.component';
import { ProjectsComponent } from './shared-components/projects/projects.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductReviewComponent } from './product/product-review/product-review.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule, CarouselModule
  ],
  declarations: [
    HomeComponent, ContactComponent, AboutComponent, LoginComponent, RegisterComponent,
    AdminDetailsComponent, PaymentDetailsComponent,AdminListComponent, PageTitleComponent,
    FeedbackListComponent, ContactListComponent, NotFoundComponent, ShopComponent, ExhibitionComponent, ProjectsComponent,
    ProductListComponent, ProductDetailComponent, ProductFormComponent, ProductReviewComponent
  ]
})

export class ComponentModule { }
