import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'logbook';

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.config);
  }  
}
