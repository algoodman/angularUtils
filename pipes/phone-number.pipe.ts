/**
 * PhoneNumberPipe
 * --------------------------------------------------
 * Pipe for displaying phone numbers using format: (XXX) YYY-YYYY,
 * with XXX: Area code and YYYYYYY: Base number.
 * 
 * Expects the area code and the base number to be typeof number, the area code to be
 * at most 3 digits long and the base number to be at most 7 digits long. If shorter than this,
 * this pipe will add in leading zeros.
 * 
 * This pipe can also accept a boolean argument that will mask all but the area code if set to true.
 * 
 * Note that this should still work if the area code and/or base number happens to be strings
 * because strings (in an odd and redundant way) have a toString() method to use.
 * 
 * 
 * ~~~~~Use Example~~~~~
 * 
 * Template:
 * --------------------------
 * <p>Phone Number: {{phoneNumber | phoneNumber:areaCode}}</p> <!--Should output (345) 235-6345-->
 * <p>Masked Number: {{phoneNumber | phoneNumber:areaCode:true}}</p> <!--Should output (345) XXX-XXXX-->
 * 
 * Component:
 * --------------------------
 * class ExampleComponent {
 *     phoneNumber = 2356345;
 *     areaCode = 345;
 * }
 * 
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(baseNumber: number | string, areaCode: number | string, hideNumber?: boolean): string {
    if (baseNumber == null && areaCode == null) {
      return "";
    }
    if (baseNumber == null || areaCode == null) {
      //throw new ReferenceError("PhoneNumberPipe error: Base number and area code need to be provided.");
      return "";
    }

    let stringifiedCode: string = areaCode.toString();
    let stringifiedBase: string = baseNumber.toString();

    /*
    if (areaCode != null && stringifiedCode.length > 3) {
      throw new RangeError("PhoneNumberPipe error: Provided area code " + stringifiedCode + " has more than 3 digits.");
    }
    if (areaCode != null && stringifiedBase.length > 7) {
      throw new RangeError("PhoneNumberPipe error: Area code provided but base phone number has more than 7 digits.");
    }

    if (hideNumber != null && hideNumber !== true && hideNumber !== false) {
      throw new TypeError("PhoneNumberPipe error: Provided value for hideNumber argument is not a boolean.");
    }
    */

    while (stringifiedCode.length < 3) {
      stringifiedCode = "0" + stringifiedCode;
    }

    while (stringifiedBase.length < 7) {
      stringifiedBase = "0" + stringifiedBase;
    }

    let formattedNumber: string = "(" + stringifiedCode + ") ";
    if (hideNumber === true) {
      formattedNumber += "XXX-XXXX";
    } else {
      if (stringifiedBase.length == 7) {
        formattedNumber += stringifiedBase.substring(0, 3) + "-" + stringifiedBase.substring(3);
      }  else {
        formattedNumber += stringifiedBase;
      }
    }

    return formattedNumber;
  }
}

/** 
 * Alternative pipe for phone numbers that don't have their area code and base numbers split into
 * two variables.
 * 
 * Here the number is expected to have at most 10 digits, and will add leading zeros in if less
 * than that are provided.
 * 
 * This pipe can also accept a boolean argument that will mask all but the area code if set to true.
 * 
 * Usage is pretty much the same as the regular one.
*/
@Pipe({
  name: 'phoneNumberFull'
})
export class PhoneNumberFullPipe implements PipeTransform {
  transform(fullNumber: number | string, hideNumber?: boolean): string {
    if (fullNumber == null) {
      return "";
    }

    let stringifiedNumber: string = fullNumber.toString();

    /*
    if (stringifiedNumber.length > 10) {
      throw new RangeError("PhoneNumberFullPipe error: Provided number " + stringifiedNumber + " has more than 10 digits.");
    }
    if (hideNumber != null && hideNumber !== true && hideNumber !== false) {
      throw new TypeError("PhoneNumberFullPipe error: Provided value for hideNumber argument is not a boolean.");
    }
    */

    while (stringifiedNumber.length < 10) {
      stringifiedNumber = "0" + stringifiedNumber;
    }

    let formattedNumber: string;
    if (hideNumber === true) {
      formattedNumber = "(" + stringifiedNumber.substring(0, 3) + ") XXX-XXXX";
    } else {
      if (stringifiedNumber.length == 10){
        formattedNumber = "(" + stringifiedNumber.substring(0, 3) + ") " + stringifiedNumber.substring(3, 6) + "-" + stringifiedNumber.substring(6);
      } else {
        formattedNumber = stringifiedNumber;
      }
    }

    return formattedNumber;
  }
}
