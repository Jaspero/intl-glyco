import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

@Component({
  selector: 'jaspero-become-sponsor',
  templateUrl: './become-sponsor.component.html',
  styleUrls: ['./become-sponsor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BecomeSponsorComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      institution: '',
      department: '',
    });
  }

  submit() {
    return () =>
      this.afs
        .collection(FirestoreCollection.SponsorRequests)
        .doc(this.afs.createId())
        .set({
          createdOn: Date.now(),
          ...this.form.getRawValue()
        })
  }

}
