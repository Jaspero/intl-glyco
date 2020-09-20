import { TestBed, async, inject } from '@angular/core/testing';

import { AnnouncementsGuard } from './announcements.guard';

describe('AnnouncementsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnouncementsGuard]
    });
  });

  it('should ...', inject([AnnouncementsGuard], (guard: AnnouncementsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
