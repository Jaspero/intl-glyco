import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

@Component({
  selector: 'jaspero-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementsComponent implements OnInit {
  constructor(
    private afs: AngularFirestore
  ) { }

  items$: Observable;

  ngOnInit() {
    this.items$ = this.afs
      .collection(FirestoreCollection.Announcements)
      .valueChanges()
  }
}
