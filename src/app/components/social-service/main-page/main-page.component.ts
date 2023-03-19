import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

// Tipado de objetos para los usuarios
type User = { name: string; email: string; role: string; lab: string};

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  public user: any;

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    console.log(this.user.user); // Imprimir la variable user en la consola
  }
}
