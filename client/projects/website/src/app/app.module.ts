import {DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StateService} from './shared/services/state/state.service';
import {SharedModule} from './shared/shared.module';
import {
  CalendarCommonModule,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarMonthModule,
  CalendarUtils,
  DateFormatterParams
} from 'angular-calendar';
import {DraggableHelper} from 'angular-draggable-droppable';

export class CustomDateFormatter extends CalendarDateFormatter {
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEE', locale);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Calendar
    CalendarCommonModule,
    CalendarMonthModule
  ],
  providers: [
    StateService,

    // Calendar,
    DraggableHelper,
    CalendarEventTitleFormatter,
    CalendarUtils,
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
