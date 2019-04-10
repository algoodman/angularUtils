/**
 * CheckPermissionDirective will show/hide child elements based on the permission attribute of the child element
 * The component class must implement a local variable that represents the Permission enumeration. If the component
 * extends BaseComponent, then it already has Permission variable that represents the enum.
 *
 * The directive will find all child elements that have the perm attribute. Must use 'attr.perm' because it is a custom attribute.
 * Usage:
 * <div appCheckPerm>
 *    <div [attr.perm]="Permission.Converse_Access_8">User will only see this if they have the Converse_Access_8 permission</div>
 * </div>
 *
 * Note: Don't use magic numbers for the permissions
 * <div attr.perm="8">some stuff</div>
 * Please use the angular template expression functionality using brackets '[attr.perm]' to interpolate the value from
 * your component or just use a string value. The directive will attempt to figure out the permission from
 * the string.
 * <div [attr.perm]="Permission.Converse_Access_8">xxxxx</div>
 * <div attr.perm="Permission.Converse_Access_8">xxxxx</div>
 * <div attr.perm="Converse_Access_8">xxxxx</div>
 */

import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {Broadcaster} from '../services/broadcaster.service';
//import {BroadcastKeys} from '@constants';
import {Utils} from '../utils';

import * as _ from 'lodash';
import * as $ from 'jquery';
import {Permission} from '../enums/Permission';
import { BaseComponent } from '../base/base-component';

declare let BroadcastChannel: any;

declare let jQuery: JQueryStatic;

@Directive({
  selector: '[appCheckPerm]'
})

export class CheckPermissionDirective extends BaseComponent implements AfterViewInit, OnDestroy {

  private jqueryElement: JQuery;


  constructor(private elementRef: ElementRef, private broadcaster: Broadcaster) {
    super();

    this.addSubscription(
      this.broadcaster.listenBroadcastEvent<string>('UserAuthenticated').subscribe((broadcastEvent) => {
        this.processPermissionElements();
      })
    )

  }

  // after the view dom is created
  ngAfterViewInit(): void {
    try {
      this.jqueryElement = jQuery(this.elementRef.nativeElement);
    } catch (e) {
      console.error('Failed to instantiate , Error: ' + e);
    }
    this.processPermissionElements();
  }

  // clean up
  ngOnDestroy() {
    this.unsubscribeAll();
  }

  processPermissionElements() {
    let hideOverride = false;
    // get user's permissions
    const userPerms: number[] = this.authService.getCachedAgentPermissions();
    if (Utils.isBlank(userPerms)) {
      hideOverride = true; // user not logged in, or cached perms are empty
    }

    // run the function for each child element with a 'perm' attribute
    this.jqueryElement.find('*[perm]').each((idx: number, domElem: Element) => {
      // if the permission is in the list of user perms, show element else hide element
      const tmp = $(domElem).attr('perm');
      if (Utils.isNotBlank(tmp)) {
        let perm = parseInt(tmp, 10);
        if (Utils.isNil(perm) || _.isNaN(perm)) {
          // try to convert a string permission to an enum value
          const tmpVal = tmp.split('.');
          if (Utils.isNotBlank(tmpVal) ) {
            if (tmpVal.length > 1) {
            const tmpVal2 = tmpVal[1];
            perm = Permission[tmpVal2];
          } else {
              // try using the whole string to get the enum
              perm = Permission[tmp];
            }
          }
          if (Utils.isNil(perm) || _.isNaN(perm)) {
            perm = 0;
          }
        }
        if (hideOverride) {
          $(domElem).hide();
        } else {
          // bypass perm check if permission = 0
          if (perm === 0) {
            $(domElem).show();
          } else if (userPerms.includes(perm)) {
            $(domElem).show();
          } else {
            $(domElem).hide();
          }
        }
      }
    });
  }
}

/**
 * ItemCheckPermissionDirective will show/hide the element based on the permission value element.
 *
 * The directive will only check the permission of the element it is on.
 *
 * This directive is useful for popup menus in mat-menu, because they aren't created in the DOM until the user clicks
 * on the menu trigger.
 *
 * Usage:
 * <div appItemCheckPerm="Permission.Converse_Access_8,Permission.Roles_View_30">User will only see this if they have the Converse_Access_8 or Roles_View_30 permissions</div>
 *
 * Note: Don't use magic numbers for the permissions
 * <div appItemCheckPerm="8">some stuff</div>
 * Use a string value for the permission. The directive will attempt to figure out the permission from the string. If there are
 * multiple permissions, separate them with commas
 * <div appItemCheckPerm="Permission.Converse_Access_8">xxxxx</div>
 */
@Directive({
  selector: '[appItemCheckPerm]'
})

export class ItemCheckPermissionDirective extends BaseComponent implements AfterViewInit, OnDestroy {
  @Input('appItemCheckPerm') appItemCheckPerm: string;
  private jqueryElement: JQuery;

  constructor(private elementRef: ElementRef, private broadcaster: Broadcaster) {
    super();

    this.addSubscription(
      this.broadcaster.listenBroadcastEvent<string>(BroadcastKeys.UserAuthenticated).subscribe((broadcastEvent) => {      
        this.processPermission();
      })
    )
  }

  // after the view dom is created
  ngAfterViewInit(): void {
    try {
      this.jqueryElement = jQuery(this.elementRef.nativeElement);
    } catch (e) {
      console.error('Failed to instantiate , Error: ' + e);
    }
    this.processPermission();
  }

  // clean up
  ngOnDestroy() {
    this.unsubscribeAll();
  }

  processPermission() {
    let hideOverride = false;
    let hasPerm = false;
    // get user's permissions
    const userPerms: number[] = this.authService.getCachedAgentPermissions();
    if (Utils.isBlank(userPerms)) {
      hideOverride = true; // user not logged in, or cached perms are empty
    }
    // if the permission is in the list of user perms, show element else hide element
    if (Utils.isNotBlank(this.appItemCheckPerm) && !hideOverride) {
      const perms = this.appItemCheckPerm.split(',');
      if (Utils.isNotBlank(perms)) {
        hasPerm = perms.some(permVal => {
          let perm = parseInt(permVal, 10);
          if (Utils.isNil(perm) || _.isNaN(perm)) {
            // try to convert a string permission to an enum value
            const tmpVal = permVal.split('.');
            if (Utils.isNotBlank(tmpVal)) {
              if (tmpVal.length > 1) {
                const tmpVal2 = tmpVal[1];
                perm = Permission[tmpVal2];
              } else {
                // try using the whole string to get the enum
                perm = Permission[permVal];
              }
            }
          }
          if (Utils.isNil(perm) || _.isNaN(perm)) {
            return true; // can't parse the perm, so show the element
          } else {
            return userPerms.includes(perm) || perm === Permission.Authenticated;
          }
        });
      }
    }
    if (hideOverride) {
      this.jqueryElement.hide();
    } else {
      if (hasPerm) {
        this.jqueryElement.show();
      } else {
        this.jqueryElement.hide();
      }
    }
  }

}
