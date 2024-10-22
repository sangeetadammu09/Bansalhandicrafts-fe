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
  menuList = [
    {
        id: 0,
        name: 'Projects',
        url:'/dashboard/project-list',
        subMenu: [],
        isActive: true
    },
    {
        id: 1,
        name: 'Metrics',
        url:'',
        subMenu: [
            {
                id: 0,
                name: 'Application Development',
                url:'/dashboard/application-development-metrics-list',
            },
            {
                id: 1,
                name: 'Application Support',
                url:'/dashboard/application-support-metrics-list',
            } 
        ],
        isActive: true
    },
    
]; 
  ngOnInit(): void {
  }

}
