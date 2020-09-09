import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCvcMask]'
})
export class CvcMaskDirective {

  @Input('appCvcMask')
  InputRestriction: number;

  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent)
  {
    console.log(event);
    const currentLength = this.element.nativeElement.value.length;

    if (currentLength + 1 <= this.InputRestriction) {
      return true;
    }

    event.preventDefault();
    return false;
  }

}
