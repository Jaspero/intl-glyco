import { TestBed, async, inject } from '@angular/core/testing';

import { EventGuard } from './event.guard';

describe('EventGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventGuard]
    });
  });

  it('should ...', inject([EventGuard], (guard: EventGuard) => {
    expect(guard).toBeTruthy();
  }));
});
