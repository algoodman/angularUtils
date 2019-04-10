/**
 * Base class for component
 *
 *
 * The Permission enum set is provided via alias so that any component template can use
 * hasPermission(Permission.WHATEVER) in *ngIf or [disabled] bindings for security purposes.
 *
 * Add in any other methods/properties that may be used by multiple components if desired.
 */
import {AuthService, ServiceLocator} from '@services';
import {Permission} from '../datatypes/enums/Permission';
import { ISubscription } from 'rxjs/Subscription';

export class BaseComponent {

  private subscriptions: ISubscription[];
  
  public Permission: any = Permission;
  public authService: AuthService

  constructor() {

    this.authService = ServiceLocator.injector.get(AuthService);
  }

  public hasPermission(perm: Permission): boolean {
    return this.authService.hasPermission(perm);
  }

  //Add add subscription to the list;
  public addSubscription(subscription: ISubscription): void{
    if (subscription){
      if (!this.subscriptions)
      {
        this.subscriptions = [];
      }
      this.subscriptions.push(subscription);
    }
  }

  public unsubscribeAll(): void{
    // clear all observable subscriptions
    if (this.subscriptions) {
      for (const sub of this.subscriptions) {
        try {
          sub.unsubscribe();
        } catch (e) {
        }
      }
      this.subscriptions.length = 0;  //clear the array
    }
  }

}
