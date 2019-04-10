/**
 * ClockPipe
 * ----------------------------------------------------
 * Given a number of seconds/milliseconds/whatever-seconds, return it as HH:MM:SS (hours:minutes:seconds).
 * 
 * Can optionally provide a divide by amount if not using base seconds.
 * 
 * ~~~~~~Use Example~~~~~~~
 * 
 * Template:
 * ------------------------
 * <p>Milliseconds countdown: {{milliseconds | clock:1000}}</p> <!--Should output 01:40:00-->
 * <p>Seconds countdown: {{seconds | clock}}</p> <!--Should output 00:01:45-->
 * 
 * Component:
 * ------------------------
 * class ExampleComponent {
 *     milliseconds = 60000000;
 *     seconds = 105;
 * }
 */
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'clock'
})
export class ClockPipe implements PipeTransform {
    transform(timeAmount: number, divideBy?: number): string {
        if (timeAmount == null || timeAmount < 1) {
            return "00:00:00";
        }

        let dividedTime: number = timeAmount / (divideBy ? divideBy : 1);

        let hours: number = Math.floor(dividedTime / 3600);
        let minutes: number = Math.floor((dividedTime - (hours * 3600)) / 60);
        let seconds: number = dividedTime - (hours * 3600) - (minutes * 60);

        seconds = Math.round(seconds);
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            if (minutes > 59) {
                minutes = 0;
                hours++;
            }
        }

        let stringifiedHours: string = hours.toString(10);
        if (hours < 1) {
            stringifiedHours = "00";
        }
        if (hours > 0 && hours < 10) {
            stringifiedHours = "0" + stringifiedHours;
        }
        let stringifiedMinutes: string = minutes.toString(10);
        if (minutes < 1) {
            stringifiedMinutes = "00";
        }
        if (minutes > 0 && minutes < 10) {
            stringifiedMinutes = "0" + stringifiedMinutes;
        }
        let stringifiedSeconds: string = seconds.toString(10);
        if (seconds < 1) {
            stringifiedSeconds = "00";
        }
        if (seconds > 0 && seconds < 10) {
            stringifiedSeconds = "0" + stringifiedSeconds;
        }
        return `${stringifiedHours}:${stringifiedMinutes}:${stringifiedSeconds}`;
    }
}