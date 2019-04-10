import {Injectable} from '@angular/core';
import {HttpRequest} from '@angular/common/http';
// import {Config} from '@config';
// import {LocalStorageNames} from '@constants';
import {Handler} from '../lib/http-handler';
import {HttpClientCallerService} from '../lib/http-client-caller.service';
import { HttpInterceptorCaller} from '../lib/http-interceptor-caller';
import {Permission} from '../enums/Permission';
import {importExpr} from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthService {

  private baseUrl = ''; //Config.Base_URL;
  private authenticated = false;

  constructor(private httpClient: HttpClientCallerService, private httpClientInterceptor: HttpInterceptorCaller,
              private handler: Handler) {
    this.getIsAuth();
  }

  isAuth() {
    return this.authenticated;
  }

  setIsAuth(auth) {
    this.authenticated = auth;
  }

  getIsAuth() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token) {
      let options = {headers: {'username': username, 'tokenkey': token}}

      return this.httpClient.post<any>(`${this.baseUrl}auth/validtoken`, '',  options).toPromise().then((result) => {
        return new Promise((resolve, reject) => {
          if (result.auth) {
            this.httpClientInterceptor.setToken(token);
            this.authenticated = true;
            if (username) {
              this.httpClientInterceptor.setUsername(username);
            }
            if (this.handler.requests.length > 1) {
              this.resendFailedPosts();
            }
            return resolve(true);
          } else {

            this.authenticated = false;
            return resolve(false);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    }
  }

  login(username: string, password: string) {
    // const login = [{
    //   key: 'username', value: username
    // }, {
    //   key: 'password', value: password
    // }];

    localStorage.removeItem('bankHolidays');
    let options = {headers: {'username': username, 'password': password}}
    return this.httpClient.post<any>(`${this.baseUrl}auth/login`, '', options).toPromise();
  }

  logout() {
    localStorage.removeItem('permissions');
    localStorage.removeItem('username');

    window.postMessage({
      fun: 'auth',
      event: 'logout'
    }, '*');
    this.authenticated = false;
  }

  getLoggedInUsername(): string {
    return this.httpClientInterceptor.getUsername();
  }

  resendFailedPosts() {
    this.handler.requests.forEach((request: HttpRequest<any>) => {
      console.log(request.url);
      if (request.url) {
        this.httpClient.post<any>(request.url, request.body, {headers: request.headers}).toPromise();
      }
    });
  }

  hasPermission(perm: Permission): boolean {
    const cachedPerms = this.getCachedAgentPermissions();
    if (Array.isArray(cachedPerms)) {
      return (cachedPerms.indexOf(perm) > -1);
    } else {
      // this.agentsService.getLoggedInAgentPermissions(this.getLoggedInUsername()).then(agentPerms => {
      //   //const permIds = _.map(agentPerms, 'id');
      //   // this.cacheAgentPermissions(permIds);
      //   this.cacheAgentPermissions(agentPerms);
      //   return (agentPerms.indexOf(perm) > -1);
      // });
    }
  }

  cacheAgentPermissions(perms: Permission[]): void {
    localStorage.setItem('permissions', JSON.stringify(perms));
  }

  clearCachedAgentPermissions(): void {
    localStorage.removeItem('permissions');
  }

  getCachedAgentPermissions(): Permission[] {
    const cachedPerms = <number[]>JSON.parse(localStorage.getItem('permissions'));
    return cachedPerms;
  }
}

export class LoginI {
  username: string;
  password: string;
}
