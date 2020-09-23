import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {from} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

@Component({
  selector: 'ig-contact',
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
      from(
        this.afs
          .collection(FirestoreCollection.Contact)
          .doc(this.afs.createId())
          .set({
            createdOn: Date.now(),
            ...this.form.getRawValue()
          })
      )
        .pipe(
          tap(() => {
            alert('Your message has been sent successfully. Thank you.');
            this.form.reset();
          })
        )
  }
}
