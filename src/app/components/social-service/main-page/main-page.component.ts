import { Component } from '@angular/core';

// Tipado de objetos para los usuarios
type User = { name: string; email: string; role: string; lab: string};

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  // public c_User: any;

  // ngOnInit(): void {
  //   this.c_User = localStorage.getItem('user');
  //   if (this.user) {
  //     this.c_User = JSON.parse(this.c_User);
  //   }
  //   console.log(this.c_User); // Imprimir la variable user en la consola
  //   console.log(this.c_User.user); // Imprimir la variable user en la consola
  // }
}
