import {HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class Handler {
  requests: Array<HttpRequest<any>> = [];
  failedUrl: string;
  failedAuth: boolean;

  saveFailedPost(request) {
    this.requests.push(request);
  }

}
