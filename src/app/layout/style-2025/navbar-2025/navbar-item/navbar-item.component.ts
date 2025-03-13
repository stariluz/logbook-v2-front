import { Component, Input } from '@angular/core';
import INavbarItem from './navbar-item.model';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent {
  @Input() item!: INavbarItem;
}
