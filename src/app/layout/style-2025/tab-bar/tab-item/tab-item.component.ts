import { Component, Input } from '@angular/core';
import { ITab } from './tab-item.model';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.css']
})
export class TabItemComponent {
  @Input() tabItem!: ITab;
}
