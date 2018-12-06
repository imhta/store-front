import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthState} from '../shared/state/auth.state';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingTrue} from '../shared/state/loading.state';


@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  showResults = false;

  isLoggedIn: boolean;
  searchConfig = {
    ...environment.algolia,
    indexName: 'product_search'
  };

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
  }

  scrollHandler(e) {
    console.log(e);
  }
  navigateTo(path: string) {
    if (this.isLoggedIn) {
      return this.store.dispatch([new LoadingTrue(), new Navigate([path])]);
    } else {
      console.log('not logged in');
    }
  }

  searchChanged(query) {
    this.showResults = !!query.length;
  }

}
