import { TestBed, async, inject } from '@angular/core/testing';

import { PageGuard } from './page.guard';

describe('PageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageGuard]
    });
  });

  it('should ...', inject([PageGuard], (guard: PageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
