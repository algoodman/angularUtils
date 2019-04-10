/**
 * Currency input directive
 *
 * Will only work on input elements with type="text" or NO type selected.
 * Usage example:
 *    <input type="text" id="tbInput" name="tbInput" [(ngModel)]="modelVal" currencyInput="1" noDecZero min="0" max="1000"
 *    min-error="Optional custom error message" max-error="Optional custom error message"/>
 * This sets up the tbInput field to two-way bind 'modelVal'
 * and will limit the user's input to 1 decimal place, with a minimum value of 0 and a maximum value of 1000. noDecZero means do not put decimals
 * when the value of the field is zero.
 * If you don't provide a number of decimal places, or a min or a max value,
 * the directive defaults to two decimal places, min value = 0.00 and max value = 999,999.99
 *
 * The directive will convert the value from JQuery AutoNumeric plugin (a string) to a number before pushing it into the model.
 *
 * Utilizes jQuery and the AutoNumeric plugin scripts that must be loaded prior to instantiating this directive
 */

import {Directive, ElementRef, forwardRef, Input, OnDestroy, OnChanges, SimpleChanges, HostListener, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, AbstractControl} from '@angular/forms';
import {Utils} from '../utils';
import AutoNumeric from 'autonumeric';
import * as _ from 'lodash';

// methods to create min/max validation functions
function createMinValidator(minVal: any) {
  return (c: AbstractControl): { [key: string]: boolean } => {
    const err = {min: true};
    return (!Utils.isNil(c.value) && c.value < +minVal) ? err : null;
  };
}

function createMaxValidator(maxVal: any) {
  return (c: AbstractControl): { [key: string]: boolean } => {
    const err = {max: true};
    if (!Utils.isNil(c.value) && c.value > +maxVal) {
      return err;
    }
    return null; // valid
  };
}

@Directive({
  selector: 'input[currencyInput]',
  providers: [
    {
      // add our ControlValueAccessor to the Angular Value Accessor DI list
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true
    },
    {
      // add our validator function to the Angular Validators DI list
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true
    }
  ]
})

export class CurrencyInputDirective implements OnInit, ControlValueAccessor, OnChanges, OnDestroy, Validator {

  // get the value of the directive selector, if provided, to get the user's number of decimal places
  // ex: <input currencyInput="3" ..../>
  // if the user didn't provide a number of decimals, it would look like this: <input currencyInput ..../>
  @Input('currencyInput') numDec: string;
  @Input('min') minStr: string;
  @Input('max') maxStr: string;
  @Input('noDecZero') noDecZero: string;
  @Input('percentMask') isPercentMaskStr: string;

  private autoNumericElement: any = null;
  private defaultNumDec = 2;
  private defaultMin = 0;
  private defaultMax = 999999.99;
  private noDecimalZero = false;

  private isInitialized: boolean = false;

  private isPercentageMask: boolean = false;
  private minVal: number; // numeric value from the user-supplied min/max attribute inputs to the directive
  private maxVal: number;

  private minValidatorFn: Function;
  private maxValidatorFn: Function;

  // angular will populate these function references as part of DI for ControlValueAccessor
  private propagateChange: Function; // any = ()=> {};
  private propagateTouch: Function; // any = ()=> {};

  // handle user input events
  @HostListener('keyup') onKeyUp(event: Event) {
    // Write value back to model
    const num = this.getNumberValue();
    this.propagateChange(num);
  }

  @HostListener('blur') blur(event: Event) {
    const num = this.getNumberValue();
    this.propagateChange(num);
    this.propagateTouch(num);
  }

  constructor(public elementRef: ElementRef) {
  }

  // use get/set pattern so we don't have to duplicate code
  get inputValue() {
    try {
      return this.autoNumericElement.getNumericString();
    } catch (e) {
      return null;
    }
  }

  set inputValue(val: string) {
    try {
      this.autoNumericElement.set(val);
    } catch (e) {
    }
  }

  // after the view dom is created
  ngOnInit(): void {
    this.isInitialized = true;
    // set up AutoNumeric input mask plugin
    let numDec: number = this.defaultNumDec;
    // test user's # of decimals from the directive default param (currencyInput)
    if (Utils.isNotNil(this.numDec) && this.numDec.trim() !== '') {
      const tmpNum = Utils.toNumber(this.numDec);
      if (!Number.isNaN(tmpNum) && tmpNum <= 6) {
        numDec = tmpNum;
      } else if (Number.isNaN(tmpNum)) {
        console.error('Number of Decimals is not a number, using default value');
        numDec = this.defaultNumDec;
      } else if (tmpNum > 6) {
        console.error('AutoNumeric has a 6 decimal place limit');
        throw new Error('AutoNumeric has a 6 decimal place limit');
      }
    }

    if (Utils.isNotNil(this.minStr)) {
      this.minVal = this.getNumFromStrInput(this.minStr, this.defaultMin);
    } else {
      this.minVal = this.defaultMin;
    }
    if (Utils.isNotNil(this.maxStr)) {
      this.maxVal = this.getNumFromStrInput(this.maxStr, this.defaultMax);
    } else {
      this.maxVal = this.defaultMax;
    }
    if (Utils.isNotNil(this.isPercentMaskStr)) {
      this.isPercentageMask = Boolean(this.isPercentMaskStr).valueOf();
    }

    try {
      const opts = {
        emptyInputBehavior: 'null',
        allowDecimalPadding: 'true',
        decimalPlaces: numDec,
        selectOnFocus: true,
        caretPositionOnFocus: null,
        modifyValueOnWheel: false//,
        // maximumValue: this.maxVal,
        // minimumValue: this.minVal
      };
      // for percentages, this will set the model value to a decimal, ex: displayed value 50% = .50 in the model
      if (this.isPercentageMask) {
        opts['rawValueDivisor'] = 100;
      }
      if (Utils.isNotNil(this.autoNumericElement)) {
        this.autoNumericElement.update(opts);
      } else {
        this.autoNumericElement = new AutoNumeric(this.elementRef.nativeElement, opts);
      }
      this.elementRef.nativeElement['autoNumeric'] = this.autoNumericElement;

      // set up min/max validation functions
      this.setupMaxValidationFunction();
      this.setupMinValidationFunction();
    } catch (e) {
      console.error('Failed to instantiate AutoNumeric, Error: ' + e);
    }
  }

  ngOnChanges(change: SimpleChanges): void {
    // try {
    //   if (Utils.isNil(this.autoNumericElement)) {
    //     return;
    //   }
    //   this.autoNumericElement.remove();
    // } catch (e) {
    //   return; // autoNumeric doesn't exist yet
    // }
    // if our min or max values changed, re-do the validation functions

    if (Utils.isNotNil(change['minStr']) && change['minStr'].currentValue !== change['minStr'].previousValue) {
      this.minStr = change['minStr'].currentValue;
      if (Utils.isNotNil(this.minStr)) {
        this.minVal = this.getNumFromStrInput(this.minStr, this.defaultMin);
      } else {
        this.minVal = this.defaultMin;
      }
      this.setupMinValidationFunction();
    }
    if (Utils.isNotNil(change['maxStr']) && change['maxStr'].currentValue !== change['maxStr'].previousValue) {
      this.maxStr = change['maxStr'].currentValue;
      if (Utils.isNotNil(this.maxStr)) {
        this.maxVal = this.getNumFromStrInput(this.maxStr, this.defaultMax);
      } else {
        this.maxVal = this.defaultMax;
      }
      this.setupMaxValidationFunction();
    }
  }

  // clean up
  ngOnDestroy() {
    try {
      this.autoNumericElement.remove();
    } catch (e) {
    }
  }

  // call validation functions
  validate(c: FormControl): {} {
    if (!this.isInitialized) {
      return null; // not ready yet
    }
    let err = this.minValidatorFn(c);
    if (Utils.isNil(err)) {
      err = this.maxValidatorFn(c);
    }
    return err;
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
    if (Utils.isNotNil(value)) {
      this.inputValue = value;
    }
  }

  private setupMinValidationFunction(): void {
    this.minValidatorFn = createMinValidator(this.minVal);
  }

  private setupMaxValidationFunction(): void {
    this.maxValidatorFn = createMaxValidator(this.maxVal);
  }

  private getNumberValue(): number {
    let num = null;
    if (Utils.isNotNil(this.inputValue) && !_.eq(this.inputValue.trim(), '')) {
      num = Utils.toNumber(this.inputValue);
    }
    return num;
  }

  private getNumFromStrInput(strInput: string, defaultNum: number): number {
    if (_.isNumber(strInput)) {
      return strInput;
    }
    let num = null;
    if (Utils.isNotNil(strInput) && !_.eq(strInput.trim(), '')) {
      num = Utils.toNumber(strInput);
    }
    return (Utils.isNil(num) || Number.isNaN(num)) ? defaultNum : num;
  }

}
