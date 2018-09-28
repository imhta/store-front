import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {AuthState} from '../shared/state/auth.state';
import {LoadingTrue} from '../shared/state/loading.state';


@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
  }

  navigateTo(path: string) {
    if (this.isLoggedIn) {
      return this.store.dispatch([new LoadingTrue(), new Navigate([path])]);
    } else {
      console.log('not logged in');
    }
  }

}
