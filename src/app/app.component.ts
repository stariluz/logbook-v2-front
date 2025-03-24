import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./layout/style-2025/theme.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'logbook';
}
