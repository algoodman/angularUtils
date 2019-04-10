import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';

import * as _ from 'lodash';

@Directive({
  selector: '[link]'
})
export class LinkDirective {
  @Input() link: string;

  @HostListener('click', ['$event'])
  onClick($event) {
    if ($event.ctrlKey || $event.metaKey) {
      // ctrl+click, cmd+click
      // open in a new tab
      $event.preventDefault();
      $event.stopPropagation();
      window.open(this.getUrl(this.link), '_blank');
    } else if ($event.shiftKey) {
      // shift+click
      // open in a new window
      $event.preventDefault();
      $event.stopPropagation();
      window.open(this.getUrl(this.link));
    } else {
      this.router.navigate(this.getLink(this.link));
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp($event) {
    // middleclick
    if ($event.which === 2) {

      $event.preventDefault();
      $event.stopPropagation();
      window.open(this.getUrl(this.link), '_blank');
    }
  }

  constructor(private router: Router) {
  }

  private getLink(link): any[] {
    if (!_.isArray(link)) {
      link = [link];
    }

    return link;
  }

  private getUrl(link): string {
    let url = '';

    if (_.isArray(link)) {
      url = link[0];

      if (link[1]) {
        url += '?' + link[1]; //qs.stringify(link[1]);
      }
    } else {
      url = link;
    }

    // fix for production url versus dev
    if (document.location.origin !== 'http://localhost:4200') {
      url = 'app/' + url;
    }
    // console.error('********************* URL from link directive ******************');
    // console.error('********************* document.location.origin: ' + document.location.origin);
    // console.error('********************* url: ' + url);

    return url;
  }
}
