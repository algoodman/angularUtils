/**
 * PipesModule
 * ---------------------------------------------------
 * Global module for custom pipes. Remember to import this module into whatever module might need them,
 * and to declare and export whatever pipes are created.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDatePipe } from './local-date.pipe';
import { PhoneNumberPipe, PhoneNumberFullPipe } from './phone-number.pipe';
import { SsnPipe } from './ssn.pipe';
import { ClockPipe } from './clock.pipe';
import { DurationPipe } from './duration.pipe';




@NgModule({
  imports: [CommonModule],
  declarations: [LocalDatePipe, PhoneNumberPipe, PhoneNumberFullPipe, SsnPipe,  ClockPipe, DurationPipe],
  exports: [LocalDatePipe, PhoneNumberPipe, PhoneNumberFullPipe, SsnPipe, ClockPipe, DurationPipe]
})
export class PipesModule {
}
