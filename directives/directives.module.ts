/**
 * DirectivesModule
 * ---------------------------------------------------
 * Global module for custom directives. Remember to import this module into whatever module might need them,
 * and to declare and export whatever directives are created.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  DebounceInputControlDirective,
  InputMaskDirective,
  DisableControlDirective,
  CheckPermissionDirective,
  CurrencyInputDirective,
  EqualValidator,
  ItemCheckPermissionDirective,
  LinkDirective,
  RoutingNumberValidator,
  PhoneNumberValidator,
  SsnMaskDirective,
  DragNDropDirective,
  TrimInputValueAccessor,
  TimeInputDirective,
  PermissionsDirective
} from './index';
import { StiNumberOnly } from './number-only.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DebounceInputControlDirective, InputMaskDirective, DisableControlDirective, CheckPermissionDirective,
    CurrencyInputDirective, TimeInputDirective,
    EqualValidator, ItemCheckPermissionDirective, RoutingNumberValidator, PermissionsDirective, PhoneNumberValidator,
    SsnMaskDirective, DragNDropDirective, LinkDirective, TrimInputValueAccessor, StiNumberOnly],
  exports: [
    DebounceInputControlDirective, InputMaskDirective, DisableControlDirective, CheckPermissionDirective,
    CurrencyInputDirective, TimeInputDirective,
    EqualValidator, ItemCheckPermissionDirective, RoutingNumberValidator, PermissionsDirective, PhoneNumberValidator,
    SsnMaskDirective, DragNDropDirective, LinkDirective, TrimInputValueAccessor, StiNumberOnly],
  providers: [DatePipe]
})

export class DirectivesModule {
}
