import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['../input.component.css','./input-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputAutocompleteComponent extends InputComponent implements OnInit {
  @Input() options!: any[];
  @Input() selectedOption!: any;
  @Input() searchBy!: string;
  filteredOptions!: any[];

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  // Filtra las opciones según lo ingresado por el usuario
  filterOptions(event: any) {
    let query = event.query;

    this.filteredOptions = this.options.filter((option) => {
      return option["searchBy"].toLowerCase().includes(query.toLowerCase());
    });
  }
}
