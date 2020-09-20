import {
  Directive,
  Output,
  EventEmitter,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnInit,
  Input
} from '@angular/core';

/**
 * Used for preventing propagation on click (calls event.stopPropagation())
 *
 * @example
 * <div (clickStop)="doSomething()"></div>
 */
@Directive({
  selector: '[jasperoStopPropagation]'
})
export class StopPropagationDirective implements OnInit, OnDestroy {
  constructor(private _renderer: Renderer2, private _el: ElementRef) {}

  @Input() preventDefault = false;
  @Output() jasperoStopPropagation = new EventEmitter();

  private _eventListener: any;

  ngOnInit() {
    this._eventListener = this._renderer.listen(
      this._el.nativeElement,
      'click',
      event => {
        if (this.preventDefault) {
          event.preventDefault();
        }

        event.stopPropagation();
        this.jasperoStopPropagation.emit(event);
      }
    );
  }

  ngOnDestroy() {
    try {
      this._eventListener.unsubscribe();
    } catch (e) {}
  }
}
