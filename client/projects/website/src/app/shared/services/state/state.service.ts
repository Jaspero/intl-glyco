import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class StateService {
  constructor() { }

  pages = [
    'welcome',
    'officers',
    'national-representatives',
    'procedure',
    'past-awards',
    'meetings',
    'beginners-guide',
    'glyco-books',
    'glyco-journals'
  ];

  currentPage$ = new BehaviorSubject(null);
  event$ = new BehaviorSubject(null);
}
