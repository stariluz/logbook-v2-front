import { Component, Input } from '@angular/core';
import INavbarSection from '../navbar-section/navbar-section.model';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent {
  @Input() sections?: INavbarSection[];
}
