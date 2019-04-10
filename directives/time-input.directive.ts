/**
 * Time Input Directive for Input Element with a Form Control
 *
 * Usage example:
 *    <input [timeInput]="'hh:mm:ss'" [timeInputControl]="formControl"/>
 *
 * This directive is only for input element with a form control.
 * It allows only numeric value and semicolon (:) to be entered
 * and change the input to have the given format.
 *
 * @param timeInput a possible format from Angular DatePipe
 */

import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[timeInput]'
})
export class TimeInputDirective {
  @Input('timeInput') format: string;

  constructor(
    private datePipe: DatePipe,
    private formControl: NgControl,
    private el: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    // Allow special keys
    if (this.isSpecial(event))
      return;

    // Prevent non-numeric keys
    if (!this.isNumber(key)) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event) {
    if (!this.isNumber(event.key)) {
      return;
    }

    let hours = this.value.slice(0, -4);
    let minutes = this.value.slice(-4, -2);
    let seconds = this.value.slice(-2);

    let newValue = '';
    if (hours > 0) {
      newValue += hours + ':';
    }
    if (minutes > 0) {
      newValue += minutes + ':';
    }
    newValue += seconds;

    this.value = newValue;
  }

  @HostListener('focusout')
  onFocusOut() {
    let hours = this.value.slice(0, -4);
    let minutes = this.value.slice(-4, -2);
    let seconds = this.value.slice(-2);
    let date = new Date();
    date.setHours(hours, minutes, seconds);
    this.formControl.control.setValue(this.datePipe.transform(date.toLocaleString(), this.format));
  }

  @HostListener('focus')
  onFocus() {
    const inputElement = <HTMLInputElement> this.el.nativeElement;
    inputElement.setSelectionRange(0, inputElement.value.length)
  }

  isNumber(key) {
    return /[0-9]/.test(key);
  }

  get value() {
    return this.formControl.control.value ? this.formControl.control.value.toString().replace(/:/g, '') : '';
  }

  set value(val) {
    this.formControl.control.setValue(val);
  }

  // Return true if the key is :, cmd+a, Backspace, Delete, Tab, Enter, or ArrowKey
  isSpecial(event: KeyboardEvent) {
    const [key, code] = [event.key, event.which];
    return key == ':' ||
      event.metaKey && key == 'a' || // cmd+a
      code == 8 ||                   // Backspace
      code == 46 ||                  // Delete
      code == 9 ||                   // Tab
      code == 13 ||                  // Enter
      code >= 37 && code <= 40;      // Arrow keys
  }
}