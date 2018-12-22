import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoadingTrue} from './shared/state/loading.state';
import {CheckAuthState} from './shared/actions/auth.actions';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'cx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select('loading') $loadingState: Observable<boolean>;
  loading: boolean;
  loadingSubscription: Subscription;


  constructor(private  store: Store) {
    this.store.dispatch([new LoadingTrue(), new CheckAuthState()]);
    this.loadingSubscription = this.$loadingState.subscribe((data) => this.loading = data.valueOf());

  }


  ngOnInit() {

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
