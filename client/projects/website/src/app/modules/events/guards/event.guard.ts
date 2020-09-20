import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {StateService} from '../../../shared/services/state/state.service';

@Injectable()
export class EventGuard implements CanActivate {
  constructor(
    private _http: HttpClient,
    private _state: StateService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this._http.get(`event/${next.params.id}`)
      .pipe(
        switchMap(data => {
          if (data['data']) {
            this._state.event$.next(data['data']);
            return of(true);
          } else {
            this._router.navigate(['/events']);
            return of(false);
          }
        }),
        catchError(() => {
          this._router.navigate(['/events']);
          return of(true);
        })
      );
  }
}
