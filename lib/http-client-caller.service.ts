import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { MatSnackBar } from '@angular/material';
import { HttpHelper } from './http-helpers';
// import { environment } from '../../environments/environment';
// import { LocalStorageNames } from '@constants';



export class InterceptorOptions {
    timeout?: number;           //milliseconds; 1) null = use default timeout   
    spinnerDelayTime?: number;  //milliseconds; 1) null = use default delay time; 2) negative = no spinner
}

export const INTERCEPTOR_OPTIONS = 'p2_interceptor_options';

@Injectable()
export class HttpClientCallerService {

    public constructor(public httpClient: HttpClient) {
    }

    /**
       * Construct a GET request which interprets the body as an `ArrayBuffer` and returns it.
       *
       * @return an `Observable` of the body as an `ArrayBuffer`.
       */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<ArrayBuffer>;
    /**
     * Construct a GET request which interprets the body as a `Blob` and returns it.
     *
     * @return an `Observable` of the body as a `Blob`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Blob>;
    /**
     * Construct a GET request which interprets the body as text and returns it.
     *
     * @return an `Observable` of the body as a `string`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<string>;
    /**
     * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Construct a GET request which interprets the body as a `Blob` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Construct a GET request which interprets the body as text and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<string>>;
    /**
     * Construct a GET request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Object>>;
    /**
     * Construct a GET request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
     */
    get<T>(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<T>>;
    /**
     * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Construct a GET request which interprets the body as a `Blob` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Construct a GET request which interprets the body as text and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<string>>;
    /**
     * Construct a GET request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Object>>;
    /**
     * Construct a GET request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
     */
    get<T>(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<T>>;
    /**
     * Construct a GET request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as an `Object`.
     */
    get(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Object>;
    /**
     * Construct a GET request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as type `T`.
     */
    get<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<T>;



    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * GET request to be executed on the server. See the individual overloads for
     * details of `get()`'s return type based on the provided options.
     */
    get(url: string, options: {
        headers?: HttpHeaders | { [header: string]: string | string[] },
        observe?: 'body' | 'events' | 'response', //HttpObserve,
        params?: HttpParams | { [param: string]: string | string[] },
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
        interceptorOptions?: InterceptorOptions;
    } = {}): Observable<any> {

        options = this.setupInterceptorOptions(options);
        if(options)
            return this.httpClient.get(url, options as any);
        else
            return this.httpClient.get(url);
    }

    //===============================================================================================
    // POST
    //===============================================================================================

    /**
       * Construct a POST request which interprets the body as an `ArrayBuffer` and returns it.
       *
       * @return an `Observable` of the body as an `ArrayBuffer`.
       */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<ArrayBuffer>;
    /**
     * Construct a POST request which interprets the body as a `Blob` and returns it.
     *
     * @return an `Observable` of the body as a `Blob`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Blob>;
    /**
     * Construct a POST request which interprets the body as text and returns it.
     *
     * @return an `Observable` of the body as a `string`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<string>;
    /**
     * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Construct a POST request which interprets the body as a `Blob` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Construct a POST request which interprets the body as text and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<string>>;
    /**
     * Construct a POST request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Object>>;
    /**
     * Construct a POST request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
     */
    post<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<T>>;
    /**
     * Construct a POST request which interprets the body as an `ArrayBuffer` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Construct a POST request which interprets the body as a `Blob` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Construct a POST request which interprets the body as text and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<string>>;
    /**
     * Construct a POST request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Object>>;
    /**
     * Construct a POST request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
     */
    post<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<T>>;
    /**
     * Construct a POST request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as an `Object`.
     */
    post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Object>;
    /**
     * Construct a POST request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as type `T`.
     */
    post<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<T>;

    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * POST request to be executed on the server. See the individual overloads for
     * details of `post()`'s return type based on the provided options.
     */
    post(url: string, body: any, options: {
        headers?: HttpHeaders | { [header: string]: string | string[] },
        observe?: 'body' | 'events' | 'response', //HttpObserve,
        params?: HttpParams | { [param: string]: string | string[] },
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
        interceptorOptions?: InterceptorOptions;
    } = {}): Observable<any> {

        options = this.setupInterceptorOptions(options);
        if(options)
            return this.httpClient.post(url, body, options as any);
        else
            return this.httpClient.post(url, body);
    }
    //===============================================================================================
    // DELETE
    //===============================================================================================
    /**
         * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns it.
         *
         * @return an `Observable` of the body as an `ArrayBuffer`.
         */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<ArrayBuffer>;
    /**
     * Construct a DELETE request which interprets the body as a `Blob` and returns it.
     *
     * @return an `Observable` of the body as a `Blob`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Blob>;
    /**
     * Construct a DELETE request which interprets the body as text and returns it.
     *
     * @return an `Observable` of the body as a `string`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<string>;
    /**
     * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Construct a DELETE request which interprets the body as a `Blob` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Construct a DELETE request which interprets the body as text and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<string>>;
    /**
     * Construct a DELETE request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Object>>;
    /**
     * Construct a DELETE request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
     */
    delete<T>(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<T>>;
    /**
     * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Construct a DELETE request which interprets the body as a `Blob` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Construct a DELETE request which interprets the body as text and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<string>>;
    /**
     * Construct a DELETE request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Object>>;
    /**
     * Construct a DELETE request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
     */
    delete<T>(url: string, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<T>>;
    /**
     * Construct a DELETE request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as an `Object`.
     */
    delete(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Object>;
    /**
     * Construct a DELETE request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as type `T`.
     */
    delete<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<T>;

    /**
   * Constructs an `Observable` which, when subscribed, will cause the configured
   * DELETE request to be executed on the server. See the individual overloads for
   * details of `delete()`'s return type based on the provided options.
   */
    delete(url: string, body: any, options: {
        headers?: HttpHeaders | { [header: string]: string | string[] },
        observe?: 'body' | 'events' | 'response', //HttpObserve,
        params?: HttpParams | { [param: string]: string | string[] },
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
        interceptorOptions?: InterceptorOptions;
    } = {}): Observable<any> {

        options = this.setupInterceptorOptions(options);
        if(options)
            return this.httpClient.delete(url, options as any);
        else
            return this.httpClient.delete(url);
    }
    //===============================================================================================
    // PUT
    //===============================================================================================
    /**
         * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns it.
         *
         * @return an `Observable` of the body as an `ArrayBuffer`.
         */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<ArrayBuffer>;
    /**
     * Construct a PUT request which interprets the body as a `Blob` and returns it.
     *
     * @return an `Observable` of the body as a `Blob`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Blob>;
    /**
     * Construct a PUT request which interprets the body as text and returns it.
     *
     * @return an `Observable` of the body as a `string`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<string>;
    /**
     * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Construct a PUT request which interprets the body as a `Blob` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Construct a PUT request which interprets the body as text and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<string>>;
    /**
     * Construct a PUT request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<Object>>;
    /**
     * Construct a PUT request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
     */
    put<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpEvent<T>>;
    /**
     * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Construct a PUT request which interprets the body as a `Blob` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Construct a PUT request which interprets the body as text and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<string>>;
    /**
     * Construct a PUT request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<Object>>;
    /**
     * Construct a PUT request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
     */
    put<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<HttpResponse<T>>;
    /**
     * Construct a PUT request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as an `Object`.
     */
    put(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<Object>;
    /**
     * Construct a PUT request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as type `T`.
     */
    put<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        interceptorOptions?: InterceptorOptions;
    }): Observable<T>;

    /**
       * Constructs an `Observable` which, when subscribed, will cause the configured
       * PUT request to be executed on the server. See the individual overloads for
       * details of `put()`'s return type based on the provided options.
       */
    put(url: string, body: any, options: {
        headers?: HttpHeaders | { [header: string]: string | string[] },
        observe?: 'body' | 'events' | 'response', //HttpObserve,
        params?: HttpParams | { [param: string]: string | string[] },
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
        interceptorOptions?: InterceptorOptions;
    } = {}): Observable<any> {

        options = this.setupInterceptorOptions(options);
        if(options)
            return this.httpClient.put(url, body, options as any);
        else    
            return this.httpClient.put(url, body);
    }

     //===============================================================================================
    // PATCH
    //===============================================================================================

    /**
     * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns it.
     *
     * @return an `Observable` of the body as an `ArrayBuffer`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Construct a PATCH request which interprets the body as a `Blob` and returns it.
     *
     * @return an `Observable` of the body as a `Blob`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
    }): Observable<Blob>;
    /**
     * Construct a PATCH request which interprets the body as text and returns it.
     *
     * @return an `Observable` of the body as a `string`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
    }): Observable<string>;
    /**
     * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Construct a PATCH request which interprets the body as a `Blob` and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Construct a PATCH request which interprets the body as text and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Construct a PATCH request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Construct a PATCH request which interprets the body as JSON and returns the full event stream.
     *
     * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
     */
    patch<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Construct a PATCH request which interprets the body as a `Blob` and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Construct a PATCH request which interprets the body as text and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Construct a PATCH request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Construct a PATCH request which interprets the body as JSON and returns the full response.
     *
     * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
     */
    patch<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<HttpResponse<T>>;
    /**
     * Construct a PATCH request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as an `Object`.
     */
    patch(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<Object>;
    /**
     * Construct a PATCH request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as type `T`.
     */
    patch<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T>;

    /**
       * Constructs an `Observable` which, when subscribed, will cause the configured
       * PATCH request to be executed on the server. See the individual overloads for
       * details of `patch()`'s return type based on the provided options.
       */
      patch(url: string, body: any, options: {
        headers?: HttpHeaders | { [header: string]: string | string[] },
        observe?: 'body' | 'events' | 'response', //HttpObserve,
        params?: HttpParams | { [param: string]: string | string[] },
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
        interceptorOptions?: InterceptorOptions;
    } = {}): Observable<any> {

        options = this.setupInterceptorOptions(options);
        if(options)
            return this.httpClient.patch(url, body, options as any);
        else
            return this.httpClient.patch(url, body);
    }



    private setupInterceptorOptions(options?: {
        headers?: HttpHeaders | { [header: string]: string | string[] },
        observe?: 'body' | 'events' | 'response', //HttpObserve,
        params?: HttpParams | { [param: string]: string | string[] },
        reportProgress?: boolean,
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
        withCredentials?: boolean,
        interceptorOptions?: InterceptorOptions;
    }) {

        if (options && options.interceptorOptions) {
            let headers: HttpHeaders | { [header: string]: string | string[] };
            if (!options.headers) {
                options.headers = new HttpHeaders();
            }
            if (options.headers instanceof HttpHeaders) {
                options.headers = options.headers.append(INTERCEPTOR_OPTIONS, JSON.stringify(options.interceptorOptions));
            } else {
                options.headers[INTERCEPTOR_OPTIONS] = JSON.stringify(options.interceptorOptions);
            }
            delete options.interceptorOptions;
        }

        return options;
    }






}



