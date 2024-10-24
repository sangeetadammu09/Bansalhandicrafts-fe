import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  onActivate(){
    // window.scroll(0,0);
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });

 }
}
