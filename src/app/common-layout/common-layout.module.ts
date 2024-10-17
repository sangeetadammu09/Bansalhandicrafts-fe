import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CommonLayoutRoutingModule } from './common-layout-routing.module';
import { HeaderComponent } from './shared-components/header/header.component';
import { ComponentModule } from '../components/component.module';
import { CommonLayoutComponent } from './shared-components/layout/common-layout.component';
import { FooterComponent } from './shared-components/footer/footer.component';


@NgModule({
    imports: [CommonModule, CommonLayoutRoutingModule,TranslateModule,NgbDropdownModule, ComponentModule,
    ],
    declarations: [CommonLayoutComponent, HeaderComponent, FooterComponent]
})
export class CommonLayoutModule {}
