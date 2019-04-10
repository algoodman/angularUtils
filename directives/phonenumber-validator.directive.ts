import { Directive, Attribute, forwardRef } from "@angular/core";
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[validatePhoneNumber][formControlName], [validatePhoneNumber][formControl], [validatePhoneNumber][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneNumberValidator), multi: true }
  ]
})

export class PhoneNumberValidator implements Validator {

  constructor(@Attribute('validatePhoneNumber') public validatePhoneNumber: string) {
  }

  validate(c: AbstractControl): {[key: string]: boolean} {
    let v = c.value;

    if (v) {
      v = v.toString();

      const phoneNumberRegex = '^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$';
      const match = v.search(phoneNumberRegex);

      // this input matches the phone number full pipe format
      if (match !== -1) {
        v = v.substring(1, 4) + v.substring(6, 9) + v.substring(10);
      }

      if (v.length !== 10 || v.charAt(0) === '1' || v.charAt(0) === '0' || v.substring(0, 3) === '911') {
        const ret = {
          validatePhoneNumber: true
        };
        return ret;
      }
    }
    return null;
  }
}
