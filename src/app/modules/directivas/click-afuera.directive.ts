import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickAfuera]'
})
export class ClickAfueraDirective {

  @Output() cliclAfueraEvent = new EventEmitter();
  @Input() condicionExtra: boolean = true;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    const click = this.elementRef.nativeElement.contains(targetElement);

    if (this.condicionExtra && !click) {
      this.cliclAfueraEvent.emit();
    }
  }

}

