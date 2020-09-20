import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class StateService {
  constructor() { }

  pages = ['glyco-journals', 'glyco-books', 'beginners-guide'];
  currentPage$ = new BehaviorSubject(null);
  event$ = new BehaviorSubject(null);
}
