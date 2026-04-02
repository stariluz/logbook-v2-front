import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { IInput } from './input.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() input!: IInput; // Usamos InputModel
  @Input() name!: string;
  @Input() disabled!: boolean;
  isFocused: boolean = false;

  private _ngModel: any;
  public get ngModel(): any { return this._ngModel }
  public set ngModel(value: any) {
    if (value !== this._ngModel) {
      this._ngModel = value;
      this.onChange(value);
    }
  }

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.ngModel = value;
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}