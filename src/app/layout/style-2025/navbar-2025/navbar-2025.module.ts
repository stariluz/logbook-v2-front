import { NgModule } from "@angular/core";
import { Navbar2025Component } from "./navbar-2025.component";
import { NavbarContentComponent } from "./navbar-content/navbar-content.component";
import { NavbarItemComponent } from "./navbar-item/navbar-item.component";
import { NavbarSectionComponent } from "./navbar-section/navbar-section.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [
    NavbarItemComponent,
    NavbarSectionComponent,
    NavbarContentComponent,
    Navbar2025Component,
  ],
  exports: [
    Navbar2025Component,
  ],
  imports: [
    AppRoutingModule,
  ],
})
export class Navbar2025Module { }
