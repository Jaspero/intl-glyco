import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {MENU} from './shared/consts/menu.const';

export function monthRange(start: Date) {
  return {
    start: new Date(start.getFullYear(), start.getMonth(), 1),
    end: new Date(start.getFullYear(), start.getMonth() + 1, 0)
  };
}

@Component({
  selector: 'ig-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
constructor(
  private http: HttpClient,
  private _router: Router
) {}

menu = MENU;
mobileMenu = false;
currentYear = new Date().getFullYear();

viewDate = new Date();
events$ = new BehaviorSubject([]);
eventsShort$ = new BehaviorSubject([]);
eventsShortLength$ = new BehaviorSubject(0);

last = {
  position: 0,
  link: ''
};

current = {
  position: 0,
  link: ''
};

ngOnInit() {
  // this.loadData();
  //
  // this._router.events
  //   .subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //       this.current = {
  //         position:  window.pageYOffset || window.document.documentElement.scrollTop,
  //         link: window.location.pathname
  //       };
  //     } else if (event instanceof NavigationEnd) {
  //       window.scroll(0, event.url === this.last.link ? this.last.position : 0);
  //       this.last = {
  //         position: this.current.position,
  //         link: this.current.link
  //       };
  //     }
  //   });
}


toggleMobileMenu() {
  this.mobileMenu = !this.mobileMenu;
}

eventClicked(event) {
  this._router.navigate([`events/${event.result._id}`]);
}
}
