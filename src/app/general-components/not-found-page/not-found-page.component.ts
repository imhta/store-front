import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
  selector: 'cx-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  navigateToHome() {
    this.store.dispatch([new Navigate([''])]);
  }
}
