import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {EventsComponent} from './events.component';
import {EventComponent} from './components/event/event.component';
import {EventGuard} from './guards/event.guard';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventsComponent
      },
      {
        path: ':id',
        component: EventComponent,
        // canActivate: [EventGuard]
      }
    ])
  ],
  // providers: [EventGuard],
  declarations: [
    EventsComponent,
    EventComponent,
    PaginationComponent
  ]
})
export class EventsModule { }
