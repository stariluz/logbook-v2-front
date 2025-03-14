import { Component, Input } from '@angular/core';
import { ITabBar } from './tab-bar.model';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent {
  @Input() tabBar: ITabBar = {
    tabs: [
      {
        label: 'Electromagnetismo',
        secondary: '4CC2',
        routerLink: ['.','course','electromagnetismo'],
      },
    ],
    actions: [
      {
        icon: "ti ti-plus",
        routerLink: ['.', 'open-group'],
      }
    ],
    activeTabIndex: 0
  };

  setActiveTab(index: number) {
    this.tabBar.activeTabIndex = index;
  }
}
