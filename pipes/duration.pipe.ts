/**
 * Duration formatting pipe
 *
 * Syntax:
 *  {{ value_expression | duration [ : format ] }}
 * @param value_expression a duration in milliseconds
 * @param format a possible format from https://momentjs.com/docs/#/displaying/format/
 *
 * Example:
 *  <span>{{ 3000 | duration }}</span>
 *  formats to: 00:00:03
 *  <span>{{ 3000 | duration: 'mm:ss' }}</span>
 *  formats to: 00:03
 */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})

export class DurationPipe implements PipeTransform {
  constructor() { }
  transform(duration: number, format: string = 'HH:mm:ss'): string {
    return moment.utc(duration).format(format);
  }
}
