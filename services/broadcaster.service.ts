/**
 * Angular 2+ version of $rootScope.$broadcast using observables
 *
 * Usage example - first, inject Broadcaster into your component.
 * To broadcast an event:
 * this.broadcaster.broadcast('EventName', data); // note: data is optional
 *
 * To watch for an event (subscribe):
 * this.broadcaster.listen<string>('EventName').subscribe(data =>{
 *   // do something with the data, if it was part of the event, or just react to the fact that a message was sent
 *   });
 *
 * Maybe you want to broadcast that a user is logged in and send out the user object so other components watch for it
 * and use that new user object?
 *
 * this.broadcaster.broadcast('UserLoggedIn', this.loggedInUserVM);
 *
 * Watching for the broadcast:
 * this.broadcaster.listen<UserVM>('UserLoggedIn').subscribe(user =>{
 *   this.user = user;
 *   // do something now that user is logged in
 *   });
 *
 * Don't forget to use constants for the event keys, so we don't have typo problems in broadcaster or listener
 */

import {Injectable, NgZone, OnDestroy} from '@angular/core';
import {Utils} from '../utils';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


declare var BroadcastChannel: any;

export interface BroadcastEvent<T> {
	key: string;
	data?: T;
	broadcasterId?: string;             //The id of the object instant (e.g. id of a component instant) sending the message.
	broadcasterServiceId: string;       //The id of the Broadcaster service instance that broadcast/rebroadcast the message.
	origBroadcasterServiceId?: string;  //The id of the orig Broadcaster service instancethe message.
}

@Injectable()
export class Broadcaster implements OnDestroy {
	private broadcastStream: Subject<BroadcastEvent<any>>;
	private rebroadcastChannel: any;
	public id: string;


	constructor(private ngZone: NgZone) {
		this.broadcastStream = new Subject<BroadcastEvent<any>>();

		// If you ever suspect you aren't working with a singleton version of this service,
		// you can use this 'id' to check in each place where you use the service to make sure they have the same 'id'.
		// I used this to find that I had imported the service into a child module and the app module provider list, so
		// the child had a different instance of the service.
		this.id = Utils.newGuid(); //Math.floor(Math.random()*25);

		//Use BroadcastChannel channel to re-broadcast messages
		//so other SPA can receive it.
		this.rebroadcastChannel = new BroadcastChannel('P2RebroadcastChannel');
		this.rebroadcastChannel.onmessage = this.broadcastChannelMessageListener;

		//Listening for events posted by window.postMessage().
		//Phone extension uses window.postMessage since cannot use BroadcastChannel.
		//Sample:  window.postMessage(
		//              {
		//                key: 'accountDataChanged',
		//                data: 12345,		            --optional; e.g. account id
		//                broadcasterId: ''           --optional;
		//              });
		window.addEventListener("message", this.windowMessageEventListener);

	}

	// fire an event with a specific key withing same SPA
	broadcast(key: string, data?: any, broadcasterId?: string) {
		this.broadcastInternal(key, data, broadcasterId, "don't rebroadcast"); //pass "don't rebroadcast" to prevent rebroadcast
	}

	// fire an event with a specific key accross all SPAs
	broadcastGlobal(key: string, data?: any, broadcasterId?: string) {
		this.broadcastInternal(key, data, broadcasterId);
	}


	listenAll(): Observable<BroadcastEvent<any>> {
		return this.broadcastStream.asObservable();
		// .map(bCastEvent => bCastEvent);
	}

	// returns an observable of events that broadcasted the key.
	// It only returns events with the specific key you requested (filter)
	listen<T>(key: string, broadcasterId?: string): Observable<T> {
		return this.broadcastStream.asObservable()
			  .filter(bCastEvent => {
				  let match = false;
				  if (bCastEvent.key === key) {
					  if (broadcasterId) {
						  match = bCastEvent.broadcasterId === broadcasterId;
					  } else {
						  match = true;
					  }
				  }

				  return match;
			  })
			  .map(bCastEvent => <T>bCastEvent.data);
	}

	// returns an observable of events that broadcasted the key.
	// It only returns events with the specific key you requested (filter)
	listenBroadcastEvent<T>(key: string, broadcasterId?: string): Observable<BroadcastEvent<T>> {
		return this.broadcastStream.asObservable()
			  .filter(bCastEvent => {
				  let match = false;
				  if (bCastEvent.key === key) {
					  if (broadcasterId) {
						  match = bCastEvent.broadcasterId === broadcasterId;
					  } else {
						  match = true;
					  }
				  }

				  return match;
			  });
	}


	// same as listen method, but calls a callback fn.
	// Use for angular 1 code to listen for angular 2 broadcast messages
	listenWithCallback<T>(key: string, callback: Function) {
		this.listen(key).subscribe(data => {
			callback(data);
		});
	}

	ngOnDestroy() {
		if (this.rebroadcastChannel) {
			this.rebroadcastChannel.close();
		}
	}

	private broadcastInternal(key: string, data?: any, broadcasterId?: string, origBroadcasterServiceId?: string) {
		this.broadcastStream.next(
			  {
				  broadcasterServiceId: this.id,
				  origBroadcasterServiceId: origBroadcasterServiceId,
				  key: key,
				  data: data,
				  broadcasterId: broadcasterId,
			  });

		if (!origBroadcasterServiceId) {
			//Broadcast to other insteads of Broadcaster (ussually in other SPAs).
			this.rebroadcastChannel.postMessage(
				  {
					  broadcasterServiceId: this.id,
					  key: key,
					  data: data,
					  broadcasterId: broadcasterId,
				  });
		}

	}

	// Needs to be lambda'ed because scope gets lost if assigning as a window listener function.
	private windowMessageEventListener = (message) => {
		if (message.data && message.data.key) {
			this.ngZone.run(() => {
				this.broadcast(message.data.key, message.data.data);
			});
		}
	}

	private broadcastChannelMessageListener = (ev) => {
		//console.log(`${new Date().toLocaleString()}: Test BCML...`);
		if (ev && ev.data && ev.data.broadcasterServiceId && ev.data.key &&
			  ev.data.broadcasterServiceId != this.id) { //Only re-broadcast if message come from another SPA to prevent infinite rebroadcasting.  We might not need this since BroadcastChannel is not listening to it own instance message.
			this.ngZone.run(() => {
				//Must run inside NgZone.run so angular know about the changes.
				//this.broadcastStream.next({key: ev.data.key, data: ev.data.data, broadcasterServiceId: this.id});
				this.broadcastInternal(ev.data.key, ev.data.data, ev.data.broadcasterId, ev.data.broadcasterServiceId);
			});
		}
	}

}
