import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[cxScrollable]'
})
export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();

  constructor() {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    try {
      this.scrollPosition.emit(event);
    } catch (err) {

    }
  }
}
