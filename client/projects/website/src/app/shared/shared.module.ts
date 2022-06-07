import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterModule} from '@angular/router';
import {LoadClickModule, SanitizeModule, StopPropagationModule} from '@jaspero/ng-helpers';
import {ENV_CONFIG} from '../../env-config';
import {SanitizePipe} from './pipes/sanitize.pipe';

const MODULES = [
  CommonModule,
  RouterModule,

  // AngularFire
  AngularFirestoreModule.enablePersistence(),
  AngularFireModule.initializeApp(ENV_CONFIG.firebase),
  AngularFireAuthModule,

  // helpers
  LoadClickModule,
  StopPropagationModule,
  SanitizeModule,
];

const COMPONENTS = [
];

const DIRECTIVES = [
];

const PIPES = [
  SanitizePipe
];

const SERVICES = [];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: SERVICES
})
export class SharedModule {}
