import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'jaspero-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() set total(t: number) {
    this.max = t;

    if (this.max <= 1) {
      this.showPagination$.next(false);
    } else {
      this.showPagination$.next(true);
      this.method();
    }
  }

  @Input() set showAll(to: boolean) {
    if (!to && to !== false) {
      this.method = this._splitAdjuct;
      return;
    }

    this.method = to ? this._noSplitAdjust : this._splitAdjuct;
  }

  @Input() current = 1;

  // How many pages will de displayed on the edges
  @Input() edges = 3;
  // How many pages will be displayed with selected
  @Input() inView = 1;
  @Output() pageChange = new EventEmitter<number>();

  showPagination$ = new BehaviorSubject(false);
  pages$ = new BehaviorSubject([]);
  max = 0;
  split = '...';
  method: any = this._splitAdjuct;

  moveLeft() {
    this.changeCurrent(this.current > 1 ? this.current - 1 : this.max);
  }

  moveRight() {
    this.changeCurrent(this.current < this.max ? this.current + 1 : 1);
  }

  changeCurrent(page: any) {
    if (page === this.split) {
      return;
    }

    this.current = page;
    this.method();
    this.pageChange.emit(page);
  }

  private _splitAdjuct() {
    const pages = [];
    const leftEdge = this.max > this.edges ? this.edges : this.max;

    // Insert left edge
    for (let i = 1; i <= leftEdge; i++) {
      pages.push(i);
    }

    if (this.current > this.edges + this.inView) {
      pages.push(this.split);
    }

    // Added center
    const centerStart = this.current - this.inView;
    const centerEnd = this.current + this.inView;

    for (let c = centerStart < 1 ? 1 : centerStart; c <= (centerEnd < this.max ? centerEnd : this.max); c++) {
      if (pages.indexOf(c) === -1) {
        pages.push(c);
      }
    }

    // Insert right edge
    if (this.current + this.inView < this.max - this.edges) {
      pages.push(this.split);
    }

    let rightEdgeStart = this.max - this.edges + 1;

    if (rightEdgeStart < this.max - 1) {
      rightEdgeStart = this.max - 1;
    }

    for (let b = rightEdgeStart; b <= this.max; b++) {
      if (pages.indexOf(b) === -1) {
        pages.push(b);
      }
    }

    this.pages$.next(pages);
  }

  private _noSplitAdjust() {
    const pages = [];

    for (let i = 1; i <= this.max; i++) {
      pages.push(i);
    }

    this.pages$.next(pages);
  }
}
