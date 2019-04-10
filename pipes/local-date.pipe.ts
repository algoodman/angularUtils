/**
 * Pacific Timezone Date formatting pipe
 * Default date format is MM/DD/YYYY unless you override with your own format or one of the canned formats
 * defined in the pipe's transform method.
 *
 * Usage Example:
 * In Component: this.testDate = moment('12/31/2017', 'MM/DD/YYYY');
 * In Html: <span [innerHtml]="testDate | hqDate:'datehhmm'></span>
 */
import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment-timezone';
import Moment = moment.Moment;


@Pipe({
  name: 'hqDate'
})

export class LocalDatePipe implements PipeTransform {
  transform(input: Number | Date | Moment, format?: string): string {

    let output = '';
    const hqTimezone = 'America/Los_Angeles';
    const typeOfInput = typeof input;
    if (!format) {
      format = 'MM/DD/YYYY';
    } else if (format.toLowerCase() === 'date') {
      format = 'MM/DD/YYYY';
    } else if (format.toLowerCase() === 'datehhmm') {
      format = 'MM/DD/YYYY hh:mm A';
    } else if (format.toLowerCase() === 'datehhmmss') {
      format = 'MM/DD/YYYY hh:mm:ss A';
    } else if (format.toLowerCase() === 'timehhmm') {
      format = 'hh:mm A';
    } else if (format.toLowerCase() === 'timehhmmss') {
      format = 'hh:mm:ss A';
    }

    if (typeOfInput === 'number') {
      output = moment.tz(input, hqTimezone).format(format);
    } else if (input instanceof Date) {
      output = moment.tz(input, hqTimezone).format(format);
    } else if (moment.isMoment(input)) {
      output = moment.tz(input, hqTimezone).format(format);
    }
    return output;
  }
}
