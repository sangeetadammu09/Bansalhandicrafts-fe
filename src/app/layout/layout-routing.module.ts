import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminDetailsComponent } from '../components/superadmin/admin-details/admin-details.component';
//import { PaymentDetailsComponent } from '../components/superadmin/payment-details/payment-details.component';
import { AdminListComponent } from '../components/superadmin/admin-list/admin-list.component';
import { FeedbackListComponent } from '../components/superadmin/feedback-list/feedback-list.component';
import { ContactListComponent } from '../components/superadmin/contact-list/contact-list.component';
import { ProductListComponent } from '../components/product/product-list/product-list.component';

const routes: Routes = [
    {
        path: 'superadmin',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'my-profile', pathMatch: 'prefix' },
            {path: 'product-list', component: ProductListComponent},
            { path : 'my-profile', component: AdminDetailsComponent},
            { path : 'admin-list', component: AdminListComponent},
            { path : 'product-feedback-list', component: FeedbackListComponent},
            { path : 'contact-list', component: ContactListComponent},
            //{ path : 'payment-list', component: PaymentDetailsComponent},

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
