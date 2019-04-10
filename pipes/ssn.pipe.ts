/**
 * SsnPipe
 * ------------------------------------------------
 * Pipe for displaying social security numbers using format: XXX-XX-XXXX,
 * with XXXXXXXXX: SSN.
 *
 * Expects the ssn to be typeof string and at most 9 characters long. If shorter than this,
 * this pipe will add in leading zeros.
 *
 * This pipe also can also accept a boolean argument that will mask all but the last four digits
 * if set to true.
 *
 * ~~~~~Use Example~~~~~
 *
 * Template:
 * ---------------------------
 * <p>SSN: {{ssn | ssn}}</p> <!--Should output 123-45-6789-->
 * <p>Masked: {{ssn | ssn:true}}</p> <!--Should output XXX-XX-6789-->
 *
 * Component:
 * ---------------------------
 * class ExampleComponent {
 *     ssn = "123456789";
 * }
 *
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ssn'
})
export class SsnPipe implements PipeTransform {

  transform(ssn: string, showLastFourOnly?: boolean): string {
    if (ssn == null) {
      //throw new ReferenceError('SsnPipe error: SSN not provided.');
      return ssn;
    }
    if(ssn.indexOf("-") > 0)
      ssn = ssn.replace("-", "");
      
    if (ssn.toString().length > 9) {
      //throw new RangeError('SsnPipe error: Provided SSN ' + ssn.toString() + ' is longer than 9 characters.');
      return ssn;
    }
    /*
    if (showLastFourOnly != null && showLastFourOnly !== true && showLastFourOnly !== false) {
      throw new TypeError('SsnPipe error: Provided value for showLastFourOnly argument is not a boolean.');
    }
    */
    let clonedSsn = ssn.toString().slice(0);
    while (clonedSsn.length < 9) {
      clonedSsn = '0' + clonedSsn;
    }
    let formattedSsn: string;
    if (showLastFourOnly === true) {
      formattedSsn = 'XXX-XX-' + clonedSsn.substring(5);
    } else {
      formattedSsn = clonedSsn.substring(0, 3) + '-' + clonedSsn.substring(3, 5) + '-' + clonedSsn.substring(5);
    }
    return formattedSsn;
  }

}
