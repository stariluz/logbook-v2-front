import { Component } from '@angular/core';
import { ITabBar } from './tab-bar.model';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent {

  tabBar: ITabBar = {
    tabs: [
      { name: 'Electromagnetismo', secondary: '4CC2' },  // Icono como clase CSS
      { name: 'Electromagnetismo', secondary: '4CC2' },     // Emoji como secundario
      { name: 'Electromagnetismo', secondary: '4CC2' } // Texto/emoji
    ],
    activeTabIndex: 0
  };
  
  setActiveTab(index: number) {
    this.tabBar.activeTabIndex = index;
  }
}
