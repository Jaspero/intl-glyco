import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

@Component({
  selector: 'ig-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  events$: Observable<any>;

  ngOnInit() {
    this.events$ = this.afs
      .collection(
        FirestoreCollection.Events,
        ref => ref.orderBy('createdOn', 'desc')
      )
      .get()
      .pipe(
        map(({docs}) =>
          docs.map(event => ({
            id: event.id,
            ...(event.data() as any)
          }))
        )
      );
  }

  redirectTo(id) {
    this.router.navigate([`events/${id}`]);
  }
}
