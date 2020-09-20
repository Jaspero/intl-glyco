import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'events',
    loadChildren: './modules/events/events.module#EventsModule'
  },
  {
    path: 'announcements',
    loadChildren: './modules/announcements/announcements.module#AnnouncementsModule'
  },
  {
    path: 'become-sponsor',
    loadChildren: './modules/become-sponsor/become-sponsor.module#BecomeSponsorModule'
  },
  {
    path: 'contact',
    loadChildren: './modules/contact/contact.module#ContactModule'
  },
  {
    path: '',
    loadChildren: './modules/page/page.module#PageModule'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
