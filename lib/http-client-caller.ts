import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from './http-helpers';
// import { environment } from '../../environments/environment';
// import { LocalStorageNames } from '@constants';

@Injectable()
export class HttpClientCaller {
  public loading: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private httpHelper: HttpHelper ) {
  }



  get(url: string, params?: any, extraHeaders?: any) {
    let headers = new HttpHeaders();
    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }

    return this.http.get(url, { headers: headers, params: params }).toPromise()
      .then((result) => {
        return this.httpHelper.extractData(result);
      })

  }

  getBlob(url: string) {
    let headers = new HttpHeaders();
    return this.http.get(url, { headers: headers, responseType: 'blob' }).toPromise();
  }

  getObservable(url: string, params?: any, extraHeaders?: any): Observable<any> {
    let headers = new HttpHeaders();
    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }

    return this.http.get(url, { headers: headers, params: params })

  }

  post(url, data, extraHeaders, params?) {
    this.loading.emit(true);
    let headers: HttpHeaders = new HttpHeaders();

    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }

    return this.http.post(url, data, { headers: headers, params: params }).toPromise()
      .then((result) => {
        this.loading.emit(false);
        return this.httpHelper.extractData(result);
      })

  }

  patch(url, data, extraHeaders) {
    this.loading.emit(true);
    let headers: HttpHeaders = new HttpHeaders();

    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }

    return this.http.patch(url, data, { headers: headers }).toPromise()
      .then((result) => {
        this.loading.emit(false);
        return this.httpHelper.extractData(result);
      })

  }

  put(url, data, extraHeaders) {
    this.loading.emit(true);
    let headers: HttpHeaders = new HttpHeaders();

    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }
    return this.http.put(url, data, { headers: headers }).toPromise()
      .then((result) => {
        this.loading.emit(false);
        return this.httpHelper.extractData(result);
      })

  }

  postObservable(url: string, data: any, extraHeaders?: any): Observable<any> {
    let headers = new HttpHeaders();
    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }
    return this.http.post(url, data, { headers: headers })

  }

  delete(url, extraHeaders) {
    let headers = new HttpHeaders();
    if (extraHeaders) {
      extraHeaders.forEach(element => {
        headers = headers.append(element.key, element.value);
      });
    }
    //const options = new RequestOptions({ headers: headers });
    return this.http.delete(url, { headers: headers }).toPromise()
      .then((result) => {
        return this.httpHelper.extractData(result);
      })

  }
}
