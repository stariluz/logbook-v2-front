import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IInput } from './input.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {

  @Input() input!: IInput; // Usamos InputModel
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  isFocused: boolean = false;

  onInputChange(event: Event): void {
    console.log(event.target)
    if (this.input.change) {
      this.input.change(event); // Llamamos a la función si está definida
    }
    this.change.emit(event); // Emitimos el evento también
  }
}
