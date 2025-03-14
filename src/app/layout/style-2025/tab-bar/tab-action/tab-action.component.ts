import { Component, Input } from '@angular/core';
import { ITabAction } from './tab-action.model';

@Component({
  selector: 'app-tab-action',
  templateUrl: './tab-action.component.html',
  styleUrls: ['./tab-action.component.css']
})
export class TabActionComponent {
  @Input() action!: ITabAction;
}
