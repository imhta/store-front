import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login, Logout} from '../../shared/actions/auth.actions';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {LoadingTrue} from '../../shared/state/loading.state';

@Component({
  selector: 'cx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Select('loading') $loadingState: Observable<boolean>;
  @Select('user') $userState: Observable<object>;
  loading: boolean;
  loadingSubscription: Subscription;
  user: object;
  userSubscription: Subscription;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.loadingSubscription = this.$loadingState.subscribe((data) => this.loading = data.valueOf());
    this.userSubscription = this.$userState.subscribe((data) => this.user = data.valueOf());
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  login() {
    return this.store.dispatch([new Login()]);
  }

  logout() {
    this.store.dispatch([new LoadingTrue(), new Logout()]);
  }
}
