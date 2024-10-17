import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { PCommonModule } from '../modules/common/common.module';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    PCommonModule,
    
   
  ],
  exports:[
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    PCommonModule
   
  ],
  providers: []
})

export class SharedModule { }