import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { ContactService } from '../../../shared/services/contact.service';
import { AddressData } from '../../../shared/model/contactAddress';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  submitted = false;
  addressData = AddressData
   // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }
  public visible = false;

  constructor(private _formBuilder: FormBuilder, private authService : AuthService,private router : Router,
    private contactService: ContactService,private toastrService : ToastrService,private errHandler : ErrorhandlerService) { }

  ngOnInit(): void {
    this.contactForm = this._formBuilder.group({  
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone:  ['', [Validators.required, Validators.pattern('^[0-9,]*$'), Validators.maxLength(10)]],
      subject: [null, Validators.required],
      message : [null, Validators.required],
      
    });
  }
  


  onContactSubmit(){
    this.submitted = true;
    if(this.contactForm.valid){
      var contactObject:any = {};
      contactObject.name = this.contactForm.controls['name'].value;
      contactObject.email = this.contactForm.controls['email'].value;
      contactObject.contact = this.contactForm.controls['phone'].value;
      contactObject.subject = this.contactForm.controls['subject'].value;
      contactObject.message = this.contactForm.controls['message'].value;
      // console.log(contactObject,'------------')
      this.contactService.create(contactObject).subscribe({next: (data:any)=>{
        if(data.status == 200){
          this.toastrService.success('Thankyou! Your query has been successfully. Our Team will get to you soon!');
        this.authService.contactEmail(contactObject).subscribe((data:any) => {
         // console.log(data, 'email')
         this.router.navigate(['/'])
        });
        }
        
      },error:((err:any) =>{
        let error =  this.errHandler.handleError(err);
        //console.log(error)
        if(error.status == 401) {
         this.toastrService.error('Token Expired');
        }
        if(error.status == 500){
         this.toastrService.error('Server Error.Failed to fetch teachers list');
        }
        
     })})
    

    }else{
      return;
    }

    }

    toggleLiveDemo() {
      this.visible = !this.visible;
      this.router.navigate(['/'])
    }
  
    handleLiveDemoChange(event: any) {
      this.visible = event;
    }

}
