import { Component, Input } from '@angular/core';
import INavbarSection from './navbar-section.model';

@Component({
  selector: 'app-navbar-section',
  templateUrl: './navbar-section.component.html',
  styleUrls: ['./navbar-section.component.css']
})
export class NavbarSectionComponent {
  @Input() section!: INavbarSection;
}
