import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {StateService} from '../../../../shared/services/state/state.service';

@Component({
  selector: 'ig-jaspero-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent {
  constructor(
    public state: StateService,
  ) {}

}
