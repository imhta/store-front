import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoadingTrue} from './shared/state/loading.state';
import {CheckAuthState} from './shared/actions/auth.actions';
import {Observable, Subscription} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

declare var gtag;
@Component({
  selector: 'cx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select('loading') $loadingState: Observable<boolean>;
  loading: boolean;
  loadingSubscription: Subscription;


  constructor(private  store: Store, private router: Router) {
    this.store.dispatch([new LoadingTrue(), new CheckAuthState()]);
    this.loadingSubscription = this.$loadingState.subscribe((data) => this.loading = data.valueOf());
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-131581824-2', {
        'page_path': event.urlAfterRedirects
      });
    });
  }


  ngOnInit() {

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
