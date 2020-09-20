import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {RxDestroy} from '../../helpers/rx-destroy';

/**
 * Emits an event when a click action occured that does not target the element
 *
 * @example
 * <div (clickOutside)="doSomething()"></div>
 */
@Directive({
  selector: '[jasperoClickOutside]'
})
export class ClickOutsideDirective extends RxDestroy implements AfterViewInit {
  constructor(private _el: ElementRef, private _ngZone: NgZone) {
    super();
  }

  @Input() clickOutsideBlock = false;
  @Output() jasperoClickOutside = new EventEmitter<MouseEvent>();

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(window, 'click')
        .pipe(
          takeUntil(this.destroyed$),
          filter(
            event =>
              !this.clickOutsideBlock &&
              !this._el.nativeElement.contains(event.target)
          )
        )
        .subscribe(event => {
          this._ngZone.run(() => {
            this.jasperoClickOutside.emit(event);
          });
        });
    });
  }
}
