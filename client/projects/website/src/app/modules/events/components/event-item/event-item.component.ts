import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jaspero-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventItemComponent {
  constructor(
    private _router: Router
  ) { }

  @Input() event: any = {};

  redirectTo(link, id) {
    if (link) {
      window.open(link);
    } else {
      this._router.navigate([`events/${id}`]);
    }
  }

}
