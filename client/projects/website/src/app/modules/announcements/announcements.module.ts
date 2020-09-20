import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AnnouncementsComponent} from './announcements.component';
import {AnnouncementsGuard} from './guards/announcements.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AnnouncementsComponent,
        canActivate: [AnnouncementsGuard]
      }
    ])
  ],
  providers: [AnnouncementsGuard],
  declarations: [AnnouncementsComponent]
})
export class AnnouncementsModule { }
