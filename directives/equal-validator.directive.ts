//https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2
// Can be used to compare input values in a form. Sample bank.component's account and retypeAccountNumber
// The reverse attribute tells the validator to check both fields when one field is changed, so that the re-type field
// validates again when the account field changes and vice-versa.


import {Directive, forwardRef, Attribute} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true}
  ]
})
export class EqualValidator implements Validator {
  constructor(@Attribute('validateEqual') public validateEqual: string,
              @Attribute('reverse') public reverse: string) {
  }

  //When set to true this equal validation would compare the value and add errors to the target control whose value is being compared to in this validator 
  private get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true';
  }

  validate(c: AbstractControl): { [key: string]: any } {
    // self value passed in validateEqual
    const v = c.value;

    // control value that has validateEqual on it
    const e = c.root.get(this.validateEqual);

    // value not equal
    if (e && v !== e.value && !this.isReverse) {
      return {
        validateEqual: true
      };
    }

    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({validateEqual: true});
    }

    return null;
  }
}
