import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMostrarPassword]'
})
export class MostrarPasswordDirective {

  private _visible = false;

  constructor(private el: ElementRef) {
    const width = parseInt(this.el.nativeElement.style.width, 10);
    this.el.nativeElement.style.width = (width - 10) + 'px';

    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.textContent = '❤';
    span.style.backgroundColor = "whitesmoke";
    span.style.border = "1px solid gray";
    span.style.borderRadius = "5px";
    span.style.cursor = "pointer";
    span.style.width = "25px";
    span.style.textAlign = "center";
    span.setAttribute("class", "toggle");

    span.addEventListener('click', () => {
      this.cambiarEstado(span);
    });
    parent.appendChild(span);
  }

  cambiarEstado(span: HTMLElement) {
    if (this._visible) {
      this.ocultar(span);
    } else {
      this.mostrar(span);
    }
    this._visible = !this._visible;
  }

  mostrar(span: HTMLElement){
    this.el.nativeElement.setAttribute('type', 'text');
    span.textContent = 'X';
  }

  ocultar(span: HTMLElement){
    this.el.nativeElement.setAttribute('type', 'password');
    span.textContent = '❤';
  }
}
