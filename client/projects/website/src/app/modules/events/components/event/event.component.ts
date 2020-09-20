import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StateService } from '../../../../shared/services/state/state.service';
import { RxDestroy } from '../../../../shared/helpers/rx-destroy';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jaspero-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent extends RxDestroy implements OnInit {
  constructor(
    public state: StateService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  event: any = {};

  ngOnInit() {

    this.state.event$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(res => {
        this.event = res;
        this._cdr.markForCheck();
      });
  }

}
