/**
 * Generic input mask directive. Mostly copied from a Stack Overflow answer, but modified for
 * questionable simplicity.
 * Original Answer: https://stackoverflow.com/a/46981629
 *
 *
 * The characters used in a mask should match the characters used in the regexes.
 *
 * Main difference is to not use the spMaskValue @Input() because ng build --prod complains that you can't bind it to
 * FormControl.value because it's read-only.
 *
 * The logic is also hopefully simplified by using only references to the implicitly generated NgControl
 * (so should theoritically work for reactive AND template based forms) and the element it's on (ElementRef).
 * This version will NOT do dynamic mask changing like the other one does though.
 *
 * Important Note: Set the value you want to SEND on the NgControl, but set the value you
 * want to SEE on the ElementRef.
 *
 *
 * ~~~~~~~~~~~~~~~~~~~ Use Example(s) ~~~~~~~~~~~~~~~~~~~~~~~
 *
 * Component:
 * -------------------------
 * @Component({ ... })
 * export class MyComponent {
 *     testForm: FormGroup;
 *     altPhone: any;
 *     phoneMask: CommonMasks.US_PHONE;
 *
 *     ngOnInit(): void {
 *         this.testForm = new FormGroup({
 *             phoneNumber: new FormControl("", [])
 *         });
 *     }
 * }
 *
 * Template:
 * ---------------------------
 * <form [formGroup]="testForm">
 *     <mat-form-field>
 *         <input type="text" matInput placeholder="Phone Number" formControlName="phoneNumber" [spMask]="phoneMask">
 *     </mat-form-field>
 * </form>
 *
 * <input type="text" matInput [(ngModel)]="altPhone" [spMask]="phoneMask">
 */

import { Directive, EventEmitter, HostListener, Input, ElementRef, OnInit } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[spMask]'
})
export class InputMaskDirective implements OnInit {

    private static readonly ALPHA = 'A';
    private static readonly NUMERIC = '9';
    private static readonly ALPHANUMERIC = '?';
    private static readonly REGEX_MAP = new Map([
        [InputMaskDirective.ALPHA, /\w/],
        [InputMaskDirective.NUMERIC, /\d/],
        [InputMaskDirective.ALPHANUMERIC, /\w|\d/],
    ]);

    @Input('spMask')
    public mask: string;

    @Input('spKeepMask')
    public keepMask: boolean;

    constructor(private element: ElementRef, private ngControl: NgControl) {

    }

    /* Mask the initial value if it exists. */
    ngOnInit(): void {
        if (this.ngControl.value != null) {
            this.setDisplayValue();
        }
    }

    @HostListener("input", ["$event"])
    onInput(event: any): void {
        this.setDisplayValue();
        this.setControlValue();
    }

    /* Update the value on the element. Should dynamically add the extra characters
     * defined in the mask. (This will not remove extra characters for backspace events; that
     * would take more work.)
     */
    setDisplayValue(): void {
        let displayValue: string = "";
        let elementValue = String(this.element.nativeElement.value);
        let elementValueLength = elementValue.length;
        let maskLength = this.mask.length;

        let elementIndex = 0;
        for (let i = 0; i < Math.min(elementValueLength, maskLength); i++) {
            let maskChar = this.mask.charAt(i);
            let elementChar = elementValue.charAt(elementIndex);
            let maskRegex: RegExp = InputMaskDirective.REGEX_MAP.get(maskChar);

            if (maskRegex) {
                elementIndex++;

                if (maskRegex.test(elementChar)) {
                    displayValue += elementChar;
                } else {
                    i--;
                    elementValueLength--;
                }
            } else {
                maskChar === elementChar ? elementIndex++ : elementValueLength++;
                displayValue += maskChar;
            }
        }

        this.element.nativeElement.value = displayValue;
    }

    /* Update the value on the NgControl to the unmasked version of the element's value unless
     * keepMask is set to true.
     *
     * Relies on the element's value being updated, so this should only be called after that.
     */
    setControlValue(): void {
        let controlValue: string = "";
        let elementValue = String(this.element.nativeElement.value);
        if (this.keepMask === true) {
            controlValue = elementValue;
        } else {
            let splitValue = elementValue.split("");
            let valueWithoutFiller = splitValue.filter((currChar, idx) => (idx < this.mask.length) && InputMaskDirective.REGEX_MAP.has(this.mask[idx]));
            let joinedValue = valueWithoutFiller.join("");
            controlValue = joinedValue;
        }
        this.ngControl.control.setValue(controlValue);
        this.element.nativeElement.value = elementValue; // Setting the value on the control will reset the value on the element, so set the element's value back. (Setting the value on the element won't reset the value of the control, so it's not an infinite loop.)
    }
}

