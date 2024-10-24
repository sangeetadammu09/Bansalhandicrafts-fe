import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/shared-components/home/home.component';
import { AboutComponent } from '../components/shared-components/about/about.component';
import { ContactComponent } from '../components/shared-components/contact/contact.component';
import { LoginComponent } from '../components/shared-components/login/login.component';
import { RegisterComponent } from '../components/shared-components/register/register.component';
import { CommonLayoutComponent } from './shared-components/layout/common-layout.component';
import { ShopComponent } from '../components/shared-components/shop/shop.component';
import { ExhibitionComponent } from '../components/shared-components/exhibition/exhibition.component';
import { ProjectsComponent } from '../components/shared-components/projects/projects.component';

const routes: Routes = [
     {
         path: '',
         component: CommonLayoutComponent,
        children: [
            { path: '', redirectTo: '', pathMatch: 'prefix' },
            {path: '', component: HomeComponent},
            {path: 'about', component: AboutComponent},
            {path: 'contact', component: ContactComponent},
            { path: 'product/:id', component : ShopComponent},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
            { path: 'exhibition', component: ExhibitionComponent},
            { path: 'project', component: ProjectsComponent},
           
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommonLayoutRoutingModule {}
