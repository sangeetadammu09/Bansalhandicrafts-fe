import { Component, OnInit } from '@angular/core';
import { ShopSubmenu } from '../../../shared/model/shopSubmenu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  shopSubmenuArr = ShopSubmenu;

  ngOnInit(): void {
  }

}
