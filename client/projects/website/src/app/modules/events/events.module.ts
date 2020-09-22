import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {EventComponent} from './components/event/event.component';
import {EventsComponent} from './events.component';
import {EventGuard} from './guards/event.guard';
import { SingleViewComponent } from './components/single-view/single-view.component';

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
        canActivate: [EventGuard]
      }
    ])
  ],
  providers: [EventGuard],
  declarations: [
    EventsComponent,
    EventComponent,
    SingleViewComponent
  ]
})
export class EventsModule { }
