import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[stiNumberOnly]' })
export class StiNumberOnly {
  @Input('stiNumberOnly') limit: number;

  constructor(
    private formControl: NgControl,
  ) { }

  @HostListener('keydown', ['$event'])
  onkeydown(event: KeyboardEvent) {
    // Allow special keys
    if (this.isSpecial(event)) {
      return;
    }

    if (!/[0-9]/.test(event.key) || this.inputLength >= this.limit) {
      event.preventDefault();
    }
  }

  get inputLength() {
    return this.formControl.control.value ? this.formControl.control.value.length : 0;
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