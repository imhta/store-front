import {Component, OnInit} from '@angular/core';
import {Login, Logout} from '../../shared/actions/auth.actions';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {LoadingTrue} from '../../shared/state/loading.state';
import {Navigate} from '@ngxs/router-plugin';

@Component({
  selector: 'cx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Select('user') $userState: Observable<object>;
  user: object;
  userSubscription: Subscription;
  screenWidth = window.screen.width;
  constructor(private store: Store) {
    this.userSubscription = this.$userState.subscribe((data) => this.user = data);
  }

  ngOnInit() {

  }

  navigateHome() {
    this.store.dispatch([new Navigate(['home'])]);
  }

  login() {
    return this.store.dispatch([new Login()]);
  }

  logout() {
    this.store.dispatch([new LoadingTrue(), new Logout()]);
  }
}
