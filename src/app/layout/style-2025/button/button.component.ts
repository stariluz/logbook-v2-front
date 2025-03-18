import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() button: IButton = { type: 'button', iconPos: 'left', classList: 'btn btn-primary' };
  @Output() onClick = new EventEmitter<Event>();
  @ContentChild('content', { static: false }) content!: ElementRef;

  hasContent = false;

  ngAfterContentInit() {
    this.hasContent = this.content?.nativeElement?.textContent.trim().length > 0;
  }
  
  handleClick(event: Event) {
    if (this.button.onClick) {
      this.button.onClick(event);
    }
    this.onClick.emit(event);
  }
}
