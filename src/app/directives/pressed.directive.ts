import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pressed]',
})
export class PressedDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    // this.renderer.addClass(this.element.nativeElement, 'btn-pressed');
  }
  @HostListener('class.btn-pressed') isPressed = false;
  @HostListener('click')
  isClicked() {
    console.log(this.isPressed);

    this.isPressed = !this.isPressed;
    console.log(this.isPressed);
    const hasClass =
      this.element.nativeElement.classList.contains('btn-pressed');
    console.log(hasClass);
    if (hasClass) {
      this.renderer.removeClass(this.element.nativeElement, 'btn-pressed');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'btn-pressed');
    }
  }
}
