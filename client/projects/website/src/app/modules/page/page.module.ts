import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PageGuard} from './guards/page.guard';
import {PageComponent} from './page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageComponent,
        canActivate: [PageGuard]
      },
      {
        path: ':name',
        component: PageComponent,
        canActivate: [PageGuard]
      }
    ])
  ],
  providers: [PageGuard],
  declarations: [PageComponent]
})
export class PageModule { }
