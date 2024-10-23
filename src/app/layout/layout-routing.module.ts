import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminDetailsComponent } from '../components/superadmin/admin/admin-details/admin-details.component';
//import { PaymentDetailsComponent } from '../components/superadmin/payment-details/payment-details.component';
import { AdminListComponent } from '../components/superadmin/admin/admin-list/admin-list.component';
import { ContactListComponent } from '../components/superadmin/contact-list/contact-list.component';
import { ProductListComponent } from '../components/superadmin/product/product-list/product-list.component';
import { AdminExhibitionComponent } from '../components/superadmin/admin-exhibition/admin-exhibition.component';
import { AdminprojectComponent } from '../components/superadmin/adminproject/adminproject.component';

const routes: Routes = [
    {
        path: 'superadmin',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'myprofile', pathMatch: 'prefix' },
            {path: 'productlist', component: ProductListComponent},
            { path : 'myprofile', component: AdminDetailsComponent},
            { path : 'adminlist', component: AdminListComponent},
            { path : 'exhibitions', component: AdminExhibitionComponent},
            { path : 'contactlist', component: ContactListComponent},
            { path : 'projects', component: AdminprojectComponent},

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
