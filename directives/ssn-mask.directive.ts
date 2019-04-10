/**
 * SSN input mask.
 *
 * Will only work on input elements with type="text" or NO type selected.
 * Usage example:
 *    <input type="text" id="tbInput" name="tbInput" [(ngModel)]="modelVal" ssn-mask/>
 * This sets up the tbInput field to two-way bind 'modelVal'
 * and will limit the user's input to 9 digits, formatted in the view as 999-99-9999.
 * The value returned to the model will be a string of digits, with no formatting, ex: '999999999'
 *
 * Utilizes jQuery and the jquery.formatter plugin scripts that must be loaded prior to instantiating this directive
 */
import {Directive, ElementRef, forwardRef, HostBinding, HostListener, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, Validator} from '@angular/forms';
import {EditMask} from '../edit-mask';
import {CommonRegex} from '../common-regex';
import {SsnPipe} from '../pipes/ssn.pipe';
import {Utils} from '../utils';
import * as _ from 'lodash';


@Directive({
  selector: 'input[ssn-mask]',
  providers: [
    {
      // add our ControlValueAccessor to the Angular Value Accessor DI list
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SsnMaskDirective),
      multi: true
    },
    {
      // add our validator function to the Angular Validators DI list
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SsnMaskDirective),
      multi: true
    }
  ]
})

export class SsnMaskDirective implements OnInit, ControlValueAccessor, Validator {

  private validateErrorObj = {ssnMask: true};
  private validateErrorMsgKey = 'ssnMask-Error';

  private jqueryElement: JQuery;
  private isInitialized: boolean = false;

  // angular will populate these function references as part of DI for ControlValueAccessor
  private propagateChange: Function; // any = ()=> {};
  private propagateTouch: Function; // any = ()=> {};

  // handle user input events
  @HostListener('keyup') onKeyUp(event: Event) {
    // Write value back to model
    const val = this.inputValue;
    this.propagateChange(val);
  }

  @HostListener('blur') blur(event: Event) {
    const val = this.inputValue;
    this.propagateChange(val);
    this.propagateTouch(val);
  }

  constructor(private elementRef: ElementRef) {
  }

  // use get/set pattern so we don't have to duplicate code
  get inputValue() {
    try {
      return this.jqueryElement.val().toString().replace(/-/g, '');
    } catch (e) {
      return null;
    }
  }

  set inputValue(val: string) {
    try {
      this.jqueryElement.val(val);
    } catch (e) {
    }
  }


  // after the view dom is created
  ngOnInit(): void {
    try {
      this.isInitialized = true;
      // set up jquery formatter plugin
      this.jqueryElement = jQuery(this.elementRef.nativeElement);
      this.jqueryElement['formatter']({
        'pattern': EditMask.ssnMask,
        'persistent': false
      });

    } catch (e) {
      console.error('Failed to instantiate SsnMaskDirective, Error: ' + e);
    }
  }


  validate(c: AbstractControl): { [key: string]: boolean } {
    if (!this.isInitialized) {
      return null; // not ready yet
    }
    let blankError = false,
      regexError = false,
      errorMessage = '';

    const tmpVal = (Utils.isNil(c.value) ? '' : _.isString(c.value) ? c.value : c.value.toString()).replace(/-/g, '');

    if (tmpVal.length === 0) {
      blankError = true;
    }

    if (!CommonRegex.SsnRegexp.test(tmpVal)) {
      regexError = true;
    }

    // if length > 0, must not have regex error
    if (!blankError && regexError) {
      errorMessage = '9 digit SSN.<br/> Current Value: ' + c.value;
    }

    if (errorMessage.length !== 0) {
      this.jqueryElement.attr(this.validateErrorMsgKey, errorMessage);
      return this.validateErrorObj;
    }
    return null; // valid!
  }

  // ControlValueAccessor interface method implementation
  registerOnChange(fn: any): void {
    this.propagateChange = fn; // angular hook to propagate change events from control
  }

  // ControlValueAccessor interface method implementation
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn; // angular hook to propagate touch events from control
  }

  // ControlValueAccessor interface method implementation to write model value to view
  writeValue(value: any): void {
    if (!Utils.isNil(value)) {
      try {
        this.inputValue = new SsnPipe().transform(value);
      } catch {
        // try some cleaning first before giving up
        try {
          const tmp = value.toString().replace(/-/g, '');
          this.inputValue = new SsnPipe().transform(tmp);
        } catch {

        }
      }
    }
  }
}
