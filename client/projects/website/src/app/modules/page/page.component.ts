import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StateService} from '../../shared/services/state/state.service';

@Component({
  selector: 'ig-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  constructor(
    public state: StateService
  ) {}

}
