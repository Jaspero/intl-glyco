import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

@Component({
  selector: 'ig-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementsComponent implements OnInit {
  constructor(
    private afs: AngularFirestore
  ) { }

  items$: Observable<any>;

  ngOnInit() {
    this.items$ = this.afs
      .collection(FirestoreCollection.Announcements)
      .valueChanges()
  }
}
