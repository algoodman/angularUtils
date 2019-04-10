/**
 * Debounce Input directive
 *
 * Will debounce model changes similar to angular 1 ng-model-options={debounce:500, blur: ''}
 * Default keyup debounce time is 500 ms. To change that, put a value on the directive attribute:
 *   debounce="200".
 * Default blur debounce time is 0 ms. To change that, add a blurTime="123" attribute on the element.
 *
 * Example:  <input type="text" id="em1" name="em1" [(ngModel)]="myEmail1" debounce="3000" blurTime="100" />
 */
import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {Utils} from '../utils';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';


@Directive({
  selector: '[debounce]',
  providers: [NgModel]
})
export class DebounceInputControlDirective implements AfterViewInit, OnDestroy {
  @Input('debounce') debounceTime: string;

  @Output() debouncedKeyUp: EventEmitter<any> = new EventEmitter();

  private defaultDebounceTime = 500; // 500 ms
  private unsubscribe = new Subject();

  constructor(private elementRef: ElementRef, private model: NgModel) {
  }

  ngAfterViewInit(): void {
    // get the debounce time
    let delay: number = this.defaultDebounceTime;
    // test user's debounce time from the directive default param (debounceTime)
    if (Utils.isNotBlank(this.debounceTime)) {
      const tmpNum = Utils.toNumber(this.debounceTime);
      if (!Number.isNaN(tmpNum)) {
        delay = tmpNum;
      } else if (Number.isNaN(tmpNum)) {
        delay = this.defaultDebounceTime;
      }
    }
    const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .debounceTime(delay);

    // don't do keyup event handling for tab keys
    eventStream.takeUntil(this.unsubscribe)
      .filter((e: any) => e.keyCode !== 9)
      .map(() => this.model.value)
      .subscribe(input => {
      this.debouncedKeyUp.emit(input);
    });
  }

  ngOnDestroy() {
    // when Angular tears down the component, close the 'unsubscribe' subject
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

// @Directive({
//   selector: '[debounce]',
//   providers: [
//     {
//       // add our ControlValueAccessor to the Angular Value Accessor DI list
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => DebounceInputControlDirective),
//       multi: true
//     }
//   ]
// })
// export class DebounceInputControlDirective implements AfterViewInit, ControlValueAccessor, OnDestroy {
//
//   // get our directive's attribute values
//   @Input('debounce') debounceTime: string;
//   @Input('blurTime') blurTime: string;
//
//   private defaultBlurTime = 0; // default blur time is 0 ms
//   private defaultDebounceTime = 500; // 500 ms
//
//   // angular will populate these function references as part of DI for ControlValueAccessor
//   private propagateChange: Function; // any = ()=> {};
//   private propagateTouch: Function; // any = ()=> {};
//
//   private keyUpObservable: Subscription;
//   private blurObservable: Subscription;
//
//   constructor(private elementRef: ElementRef, private renderer: Renderer2) {
//   }
//
//
//   // after the view dom is created
//   ngAfterViewInit(): void {
//     // get the debounce time
//     let debounceTime: number = this.defaultDebounceTime;
//     // test user's debounce time from the directive default param (debounceTime)
//     if (!Utils.isNil(this.debounceTime) && this.debounceTime.trim() !== '') {
//       const tmpNum = Utils.toNumber(this.debounceTime);
//       if (!Number.isNaN(tmpNum)) {
//         debounceTime = tmpNum;
//       } else if (Number.isNaN(tmpNum)) {
//         debounceTime = this.defaultDebounceTime;
//       }
//     }
//     // and set up an observable chain on the element's keyup event so we can debounce it
//     this.keyUpObservable = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
//       .debounceTime(debounceTime) // this is where we introduce our debounce delay
//       .subscribe((event: any) => {
//         this.propagateChange(event.target.value); // let angular know the value has changed
//       });
//
//     // get the blur time and set up an observable chain on the element
//     let blurTime: number = this.defaultBlurTime;
//     // test user's blur time from the directive default param (blurTime)
//     if (!Utils.isNil(this.blurTime) && this.blurTime.trim() !== '') {
//       const tmpNum = Utils.toNumber(this.blurTime);
//       if (!Number.isNaN(tmpNum)) {
//         blurTime = tmpNum;
//       } else if (Number.isNaN(tmpNum)) {
//         blurTime = this.defaultBlurTime;
//       }
//     }
//     this.blurObservable = Observable.fromEvent(this.elementRef.nativeElement, 'blur')
//       .debounceTime(blurTime)
//       .subscribe((event: any) => {
//         this.propagateChange(event.target.value);
//         this.propagateTouch(event.target.value);
//       });
//   }
//
//   // guard against memory leaks
//   ngOnDestroy(): void {
//     if (this.keyUpObservable) {
//       this.keyUpObservable.unsubscribe();
//     }
//     if (this.blurObservable) {
//       this.blurObservable.unsubscribe();
//     }
//   }
//
//   // ControlValueAccessor interface method implementation
//   registerOnChange(fn: any): void {
//     this.propagateChange = fn; // angular hook to propagate change events from control
//   }
//
//   // ControlValueAccessor interface method implementation
//   registerOnTouched(fn: any): void {
//     this.propagateTouch = fn; // angular hook to propagate touch events from control
//   }
//
//   // ControlValueAccessor interface method implementation to write model value to view
//   writeValue(value: any): void {
//     if (!Utils.isNil(value)) {
//       this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
//     }
//   }
// }
