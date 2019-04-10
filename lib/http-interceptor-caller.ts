import { Injectable, Injector, InjectionToken , EventEmitter, NgZone} from '@angular/core';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';;
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/timeout';
// import {LocalStorageNames} from '@constants';
// import {environment} from '../../environments/environment';
import { InterceptorOptions, INTERCEPTOR_OPTIONS } from './http-client-caller.service';

import { Handler } from './http-handler';
import { Utils } from '../utils';
const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
const defaultTimeout = 60000;
const defaultSpinnerTimeDelay = 2000;


@Injectable()
export class HttpInterceptorCaller implements HttpInterceptor {
  constructor(private spinner: any, //Ng4LoadingSpinnerService,
               private router: Router, private handler: Handler, private ngZone: NgZone) {
  }

  count: number = 0;
  url: string;
  private username: string;
  public error: EventEmitter<any> = new EventEmitter();
  private token: string;

  setToken(token: string) {
    if (token) {
      localStorage.setItem(token, token);
      this.token = token;
    }
  }

  getToken() {
   // return this.token;
   return  localStorage.getItem(this.token);
  }

  setUsername(username: string) {
    if (username) {
      localStorage.setItem('username', username);
      this.username = username;
    }
  }

  getUsername() {
    //return this.username;
    return  localStorage.getItem('username');
  }

  createAuthorizationHeader(req: HttpRequest<any>) {

    //remove the customtimeout being added in the header
    // if(!Utils.isNullOrUndefined( req.headers.get('customTimeout'))){
    //   let headers = req.headers;
    //   headers =  req.headers.delete("customTimeout");
    //   req = req.clone({ headers: headers});
    // }

    const token: string = this.getToken();
    const username = this.getUsername();
    if (token && username) {
      //need to clone request as they are immutable
      req = req.clone({headers: req.headers.set('tokenkey', token)});

      if(!req.headers.get('username'))
        req = req.clone({headers: req.headers.set('username', username)});

    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let interceptorOptions: InterceptorOptions = JSON.parse(req.headers.get(INTERCEPTOR_OPTIONS));
    //console.log('interceptorOptions: ' + JSON.stringify(interceptorOptions));

    if(!Utils.isNullOrUndefined( interceptorOptions )){
      let headers = req.headers.delete(INTERCEPTOR_OPTIONS);
      req = req.clone({ headers: headers});
    }
    let spinnerDelayTime : number = ( interceptorOptions && !Utils.isNullOrUndefined(interceptorOptions.spinnerDelayTime ) ) ? (interceptorOptions.spinnerDelayTime) : defaultSpinnerTimeDelay;
    let sentTimeout : number = ( interceptorOptions && interceptorOptions.timeout) ? (interceptorOptions.timeout) :defaultTimeout;

    //let sentTimeout  =  (req.headers.get('timeout')) ; //check if a timeout value was passed
    let modifiedReq = this.createAuthorizationHeader(req);

    // if caller explicitly set no spin, skip increment count for this call hence no spin
    if (modifiedReq && modifiedReq.params && modifiedReq.params.get('nospin') === 'true') {
      modifiedReq = modifiedReq.clone({ params: modifiedReq.params.delete('nospin') });
    } else {
      this.count++;
    }

    if (this.count === 1 && spinnerDelayTime > -1) {
      //only show spinner if request takes more than 2 sec
      setTimeout(() => {
        if (this.count > 0) {
          this.spinner.show();
        }
      }, spinnerDelayTime);
    }
    // Clone the request to add the new header.
    const authReq = modifiedReq.clone({ headers: modifiedReq.headers });
    // let timeout = defaultTimeout;
    // if(!Utils.isNullOrUndefined( sentTimeout))
    //   timeout = Number(sentTimeout);

    return next.handle(authReq).timeout(sentTimeout)
       .do(event => {
        if (event instanceof HttpResponse) {
          this.count--;
          if (this.count <= 0) {
            this.ngZone.run(()=>{
              this.spinner.hide();
            });
          }
        }
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.log('Failed');
          const url = modifiedReq.url.split('/');
          if (modifiedReq.method === 'POST' &&  url[url.length - 1] !== 'login') {
            this.handler.saveFailedPost(modifiedReq);
          }
          this.handler.failedUrl = this.router.url;
          this.handler.failedAuth = true;
          this.router.navigate(['login']);
        }
        this.handleError(err);
        this.count--;
        return Observable.throw(err);
      })
      .finally(() => {
        if (this.count < 0) {
          this.count = 0;
        }

        if (this.count === 0) {
          //somehow you need a timeout; otherwise, spinner wont trigger hide()
          setTimeout(() => {
            this.ngZone.run(()=>{
              this.spinner.hide();
            });
          }, 500);
        }
      });

  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errorMessage = '';
    if (err.statusText === 'OK') {
      // try for a more descriptive message
      if (err.hasOwnProperty('error') && err.error.hasOwnProperty('message')) {
        errorMessage = `Error: ${err.error.hasOwnProperty('error') ? err.error.error + ' - ' : ''} ${err.error.message}`;
      }else if (err.hasOwnProperty('error') && err.error.hasOwnProperty('msg')) {
        errorMessage = `Error: ${err.error.hasOwnProperty('error') ? err.error.error + ' - ' : ''} ${err.error.msg}`;
      }
    } else {
      errorMessage = 'Error: ' + err.statusText;
    }
    // no errors, then is connection error
    if (errorMessage === '') {
      errorMessage = 'error'; // environment.httpErrors[0].msg;
    }
    // const sbRef = this.snackBar.open(errorMessage, 'Close', {duration: 10000});
    // const sub = sbRef.onAction().subscribe(() => {
    //   sbRef.dismiss(); // close snackbar
    //   sub.unsubscribe(); // unsubscribe from the subscription
    //});
  }


}
