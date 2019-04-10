/*https://stackoverflow.com/questions/47611181/angular4-mask-characters-in-input-without-changing-its-value*/

import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {ControlContainer} from '@angular/forms';

@Directive({
  selector: '[hideValue]'
})
export class HideValueDirective implements OnInit {
  private value: any;  //the variable where we save the "true value"
  private element: HTMLInputElement
  constructor(private el: ElementRef, private form: ControlContainer) {
    this.element = el.nativeElement;
  }
  ngOnInit() { //It's necesary use OnInit, otherwise the first time not formtted
    this.value = this.element.value;
    this.formatValue();
  }
  @HostListener('input') onChange() {  //when a change happens save the value in a variable
    this.value = this.element.value;   
  }
  @HostListener('blur') onBlur() { //when lost the focus call format function
    this.formatValue();
  }
  @HostListener('focus') onFocus() { //when get the focus recover the true value
    this.element.value = this.value;
  }
  formatValue() { 

    let len=this.element.value.length;
    let val = this.element.value;
    if(len > 0)
    this.element.value =  val.replace(/\./gi, '*');
  }
}