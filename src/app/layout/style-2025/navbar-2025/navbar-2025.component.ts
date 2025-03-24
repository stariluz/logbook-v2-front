import { Component } from '@angular/core';
import INavbarSection from './navbar-section/navbar-section.model';

@Component({
  standalone: false,
  selector: 'app-navbar-2025',
  templateUrl: './navbar-2025.component.html',
  styleUrls: ['./navbar-2025.component.css']
})
export class Navbar2025Component {
  navbarSections?: INavbarSection[] = [
    {
      title: " Reportes",
      items: [
        {
          "title": "Alumnos",
          "icon": "ti ti-school",
          "route": ["/reports", "student-reports"]
        },
        {
          "title": "Maestros",
          "icon": "ti ti-eyeglass-2",
          "route": ["/reports", "professor-reports"]
        },
        {
          "title": "Servicio Social",
          "icon": "ti ti-social",
          "route": ["/reports", "social-service-reports"]
        },
        {
          "title": "Ayudantías",
          "icon": "ti ti-message-chatbot",
          "route": ["/reports", "assistanships-reports"]
        },
      ]
    },
    {
      title: "Registros",
      items: [
        {
          "title": "Entradas",
          "icon": "ti ti-login-2",
          "route": ["/entries"]
        },
        {
          "title": "Servicio Social",
          "icon": "ti ti-social",
          "route": ["/social-service"]
        },
        {
          "title": "Ayudantías",
          "icon": "ti ti-message-chatbot",
          "route": ["/assistanships"]
        },
      ]
    },
    {
      title: "Datos",
      items: [
        {
          "title": "Archivos",
          "icon": "ti ti-files",
          "route": ["/database/file-upload"]
        },
        {
          "title": "Usuarios",
          "icon": "ti ti-users",
          "route": ["/database/users"]
        },
        {
          "title": "Inventario",
          "icon": "ti ti-building-warehouse",
          "route": ["/inventory"]
        },
      ]
    },
  ]
}
