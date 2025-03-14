import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() icon?: string;
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() classList: string = ''; 
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() name?: string;
  @Input() id?: string;
  @Output() onClick = new EventEmitter<Event>();
  @ContentChild('content', { static: false }) content!: ElementRef;
  hasContent = false;
  ngAfterContentInit() {
    this.hasContent = this.content?.nativeElement?.textContent.trim().length > 0;
  }
}
