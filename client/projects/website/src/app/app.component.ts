import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {MENU} from './shared/consts/menu.const';
import {FirebaseOperator} from './shared/enums/firebase-operator.enum';
import {FirestoreCollection} from './shared/enums/firestore-collection.enum';

export function monthRange(start: Date) {
  return {
    start: new Date(start.getFullYear(), start.getMonth(), 1).getTime(),
    end: new Date(start.getFullYear(), start.getMonth() + 1, 0).getTime()
  };
}

@Component({
  selector: 'ig-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
constructor(
  private router: Router,
  private afs: AngularFirestore
) {}

menu = MENU;
mobileMenu = false;
currentYear = new Date().getFullYear();

viewDate = new Date();
events$ = new BehaviorSubject([]);
eventsShort$ = new BehaviorSubject([]);
eventsShortLength$ = new BehaviorSubject(0);

ngOnInit() {

  try {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      if (reg) {
        // @ts-ignore
        reg.unregister().then(function() { window.location.reload(true); });
      } else {
        // @ts-ignore
        window.location.reload(true);
      }
    });
  } catch (e) {}

  this.loadData();
}

toggleMobileMenu() {
  this.mobileMenu = !this.mobileMenu;
}

eventClicked(event) {
  this.router.navigate([`events/${event.id}`]);
}

  loadData(date = new Date()) {

    const range = monthRange(date);
    this.afs
      .collection(FirestoreCollection.Events, ref =>
        ref
          .where(
            'from',
            FirebaseOperator.LargerThenOrEqual,
            range.start
          )
          .where(
            'from',
            FirebaseOperator.SmallerThenOrEqual,
            range.end
          )
          .limit(1)
      )
      .snapshotChanges()
      .pipe(
        map(events =>
          events.map(event => {
            const data: any = event.payload.doc.data();
            return {
              id: event.payload.doc.id,
              start: data.from,
              to: data.to,
              title: data.title,
              description: data.description,
              color: {
                primary: '#aecae8',
                secondary: '#61BFE5'
              },
              result: data
            }
          })
        )
      ).subscribe(val => {
      this.events$.next(val);
      this.eventsShort$.next(val);
      this.eventsShortLength$.next(val.length);
    });
  }

  redirectTo(id) {
    this.router.navigate([`events/${id}`]);
  }

}
