import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BASE_TITLE} from '../../shared/consts/base-title.const';
import {RxDestroy} from '../../shared/helpers/rx-destroy';
import {StateService} from '../../shared/services/state/state.service';

@Component({
  selector: 'jaspero-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  constructor(
    public state: StateService
  ) {}

}
