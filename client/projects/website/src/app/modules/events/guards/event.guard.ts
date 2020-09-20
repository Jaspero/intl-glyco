import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {FirestoreCollection} from '../../../shared/enums/firestore-collection.enum';
import {StateService} from '../../../shared/services/state/state.service';

@Injectable()
export class EventGuard implements CanActivate {
  constructor(
    private afs: AngularFirestore,
    private state: StateService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.afs.collection(FirestoreCollection.Events)
      .doc(next.params.id)
      .valueChanges()
      .pipe(
        switchMap(data => {
          if (data) {
            this.state.event$.next(data);
            return of(true);
          } else {
            this.router.navigate(['/events']);
            return of(false);
          }
        }),
        catchError(() => {
          this.router.navigate(['/events']);
          return of(true);
        })
      );
  }
}
