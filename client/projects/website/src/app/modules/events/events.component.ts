import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jaspero-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _cdr: ChangeDetectorRef
  ) { }

  total = 0;
  current = 0;
  totalItems = 0;
  results = [];

  ngOnInit() {
   // this.getItems({current: this.current});
  }
  //
  // getItems(data) {
  //   this._http.post('event/paginated', data).subscribe((res: any) => {
  //     this.results = res.data.results
  //       .sort((a, b) => new Date(b.from).getTime() - new Date(a.from).getTime());
  //     this.current = res.data.current;
  //     this.total = res.data.total;
  //     this.totalItems = res.data.totalItems;
  //     this._cdr.markForCheck();
  //   });
  // }
  //
  // onPageChange(event) {
  //   this.getItems({current: event, size: 5});
  // }
}
