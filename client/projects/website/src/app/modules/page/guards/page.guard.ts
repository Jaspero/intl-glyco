import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {FirestoreCollection} from '../../../shared/enums/firestore-collection.enum';
import {StateService} from '../../../shared/services/state/state.service';


@Injectable()
export class PageGuard implements CanActivate {
  constructor(
    private state: StateService,
    private afs: AngularFirestore,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    const name = next.params ? next.params.name : '/';
    if (this.state.pages.includes(name)) {
      return this.afs
        .collection(FirestoreCollection.Pages)
        .doc(name)
        .valueChanges()
        .pipe(
          switchMap(data => {
            if (data) {
              this.state.currentPage$.next(data);
              return of(true);
            } else {
              if (name && name !== '/') {
                this.router.navigate(['/']);
              }
              return of(false);
            }
          }),
          catchError(() => {
            if (name && name !== '/') {
              this.router.navigate(['/']);
            }

            return of(true);
          })
        );
    } else {
      this.state.currentPage$.next(this.state.pages[name]);
      return of(true);
    }
  }
}
