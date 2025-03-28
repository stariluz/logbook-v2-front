import { AfterContentInit, Component, forwardRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { InputComponent } from '../input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  standalone: false,
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['../input.component.css', './input-autocomplete.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputAutocompleteComponent),
    multi: true
  }]
})
export class InputAutocompleteComponent extends InputComponent implements AfterContentInit {
  @Input() autocompleteOptions!: any[];
  @Input() searchBy!: string;
  @Input() labelBy!: string;
  protected filteredOptions!: any[];
  private filterMethod: (query: any) => void = this.filterWithoutSearchBy;

  ngAfterContentInit() {
    if (this.searchBy) {
      this.filterMethod = this.filterWithSearchBy;
      if (!this.labelBy) {
        this.labelBy = this.searchBy;
      }
    }
  }

  filterOptions(event: any) {
    let query = event.query;
    this.filterMethod?.(query);
  }

  filterWithSearchBy(query: string) {
    this.filteredOptions = this.autocompleteOptions.filter((option) => {
      return option[this.searchBy].toLowerCase().includes(query?.toLowerCase());
    });
  }

  filterWithoutSearchBy(query: string) {
    console.log("AAAAAAAAAA")
    this.filteredOptions = this.autocompleteOptions.filter((option) => {
      return option.toLowerCase().includes(query?.toLowerCase());
    });
  }
}
