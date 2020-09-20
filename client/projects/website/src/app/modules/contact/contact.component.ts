import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

@Component({
  selector: 'jaspero-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) { }

  form: FormGroup;
  options = [
    'General Inquiry',
    'Sending a message',
    'Events',
    'Announcement',
    'Report a problem',
    'Job Posting',
    'Membership Inquiry',
    'Other',
  ];

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      message: ['', [Validators.required]],
      subject: ['', [Validators.required]]
    });
  }

  submit() {
    return () =>
      this.afs
        .collection(FirestoreCollection.Contact)
        .doc(this.afs.createId())
        .set({
          createdOn: Date.now(),
          ...this.form.getRawValue()
        })
  }

}
