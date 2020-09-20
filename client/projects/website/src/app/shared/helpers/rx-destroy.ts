import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * Uses the destroyed$ subject to indicate to child components when they are destroyed
 *
 * @example
 * class SomeComponent extends RxDestroy {
 *		 	ngOnInit() {
 *			 	Observable.interval(1000)
 *			 		.takeUntil(this.destroyed$)
 *			 		.subscribe(_ => {});
 *			 }
 * }
 */
export class RxDestroy implements OnDestroy {
  /**
   * Used like this in classes that extend RxDestroy: someObservable$.takeUntil(this.destroyed$)
   */
  destroyed$ = new Subject<void>();

  /**
   * Calls next() on this.destroyed$ to cancel all listeners
   */
  ngOnDestroy() {
    this.destroyed$.next();
  }
}
