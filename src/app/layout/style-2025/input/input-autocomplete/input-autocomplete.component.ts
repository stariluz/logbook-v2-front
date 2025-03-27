import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  standalone: false,
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['../input.component.css', './input-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputAutocompleteComponent extends InputComponent {
  @Input() options!: any[];
  @Input() selectedOption!: any;
  @Output() selectedOptionChange: EventEmitter<any> = new EventEmitter();
  @Input() searchBy!: string;
  filteredOptions!: any[];

  // Filtra las opciones según lo ingresado por el usuario
  filterOptions(event: any) {
    let query = event.query;

    this.filteredOptions = this.options.filter((option) => {
      return option[this.searchBy].toLowerCase().includes(query?.toLowerCase());
    });
  }

  onSelectedOptionChange($event: any) {
    this.selectedOptionChange.emit($event)
  }
}
