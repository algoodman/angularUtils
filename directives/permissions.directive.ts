import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective implements OnInit {
  @Input('appPermissions') permission: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    console.log(this.permission);
    if (this.permission === 'hello') {
      this.el.nativeElement.hidden = true;
    }
  }

}
