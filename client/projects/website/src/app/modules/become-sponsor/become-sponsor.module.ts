import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {BecomeSponsorComponent} from './become-sponsor.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BecomeSponsorComponent
      }
    ])
  ],
  declarations: [BecomeSponsorComponent]
})
export class BecomeSponsorModule { }
