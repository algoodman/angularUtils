import { NgControl } from '@angular/forms';
import {Directive, Input} from '@angular/core';

//When working with Angular Reactive Forms that are times when you need to disable/enable a form control.
// Angular starts giving warning if you set the disabled on the template.
//The directive helps to overcome that if you do not want to  set the disabled in the component
@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
