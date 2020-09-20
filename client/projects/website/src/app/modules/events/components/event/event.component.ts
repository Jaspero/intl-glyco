import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StateService} from '../../../../shared/services/state/state.service';

@Component({
  selector: 'jaspero-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent {
  constructor(
    public state: StateService,
  ) {}

}
