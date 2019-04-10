/**
 * Routing Number Mask Directive
 *
 * validates a routing number
 *
 * 
 */

import {Directive, Attribute, forwardRef} from '@angular/core';
import {NG_VALIDATORS, AbstractControl, Validator} from '@angular/forms';

//import * as jQuery from 'jquery';
import * as _ from 'lodash';
//import * as S from 'string';


@Directive({
    selector: '[validateRouteNumber][formControlName],[validateRouteNumber][formControl],[validateRouteNumber][ngModel]',
    providers: [
      {provide: NG_VALIDATORS, useExisting: forwardRef(() => RoutingNumberValidator), multi: true}
    ]
  }
)
export class RoutingNumberValidator implements Validator {

  constructor(@Attribute('validateRouteNumber') public validateRouteNumber: string) {
  }

  validate(c: AbstractControl): { [key: string]: boolean } {

    //let e = c.root.get(this.validateRouteNumber);
    const tmpVal = (_.isNil(c.value) ? '' : _.isString(c.value) ? c.value : c.value.toString());
    let bValid: boolean;

    if (tmpVal.length === 9) {
      const checksumTotal = (3 * (parseInt(tmpVal.charAt(0), 10) + parseInt(tmpVal.charAt(3), 10) + parseInt(tmpVal.charAt(6), 10))) +
        (7 * (parseInt(tmpVal.charAt(1), 10) + parseInt(tmpVal.charAt(4), 10) + parseInt(tmpVal.charAt(7), 10))) +
        (parseInt(tmpVal.charAt(2), 10) + parseInt(tmpVal.charAt(5), 10) + parseInt(tmpVal.charAt(8), 10));

      if (checksumTotal !== 0) {
        const checksumMod = checksumTotal % 10;
        if (checksumMod === 0) {
          //errorMessage = null;
          bValid = true;
        } else {
          //errorMessage = 'Invalid Routing Number.<br/> Current Value: ' + tmpVal;
          bValid = false;
        }
      } else {
        //errorMessage = 'Invalid Routing Number.<br/> Current Value: ' + tmpVal;
        bValid = false;
      }
    } else {
      //validateRouteNumber = 'A 9 digit number is expected.<br/> Current Value: ' + tmpVal;
      bValid = false;
    }

    if (!bValid) {
      return {validateRouteNumber: true};
    }
    return null;

    // value equal and reverse
    // if (!bValid) {
    // 	e.setErrors({ validateRouteNumber: true });
    // }
    // else{
    // 	if(e && e.errors)
    // 	{
    // 		delete e.errors['validateRouteNumber'];
    // 		if (!Object.keys(e.errors).length) e.setErrors(null);
    // 	}
    // }
    // return null; // valid!
  }
}

