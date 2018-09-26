import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserModel} from '../models/auth.model';
import {
  Authenticated,
  CheckAuthState,
  Login,
  LoginFailed,
  LoginSuccessful,
  Logout,
  LogoutFailed,
  LogoutSuccessful,
  NotAuthenticated
} from '../actions/auth.actions';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse} from './loading.state';
import {delay} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';

@State<UserModel>({
  name: 'user',
  defaults: null
})
export class AuthState {
  constructor(private authService: AuthService, private  store: Store) {
  }

  @Selector()
  static uid(state: UserModel) {
    return state.uid;
  }

  @Selector()
  static token(state: UserModel) {
    return state.token;
  }

  @Action(CheckAuthState)
  async checkAuthState({setState}: StateContext<UserModel>) {

    await this.authService
      .checkAuth()
      .then((user) => user
        .subscribe((userData) => {
          if (userData !== null) {
            setState(userData);
            return this.store.dispatch(new Authenticated());
          } else {
            return this.store.dispatch(new NotAuthenticated());
          }
        }));
  }

  @Action(Login)
  async login({setState}: StateContext<UserModel>) {
    await this.authService.googleLogin()
      .then((data) => {
        setState(data);
        delay(2000);
        return this.store.dispatch(new LoginSuccessful());
      })
      .catch((err) => {
        console.log(err);
        this.store.dispatch([new LoadingFalse(), new LoginFailed(err)]);
      });

  }

  @Action(Logout)
  async logout({setState}: StateContext<UserModel>) {
    await this.authService.signOut()
      .then(() => {
        setState(null);
        return this.store.dispatch(new LogoutSuccessful());
      })
      .catch((err) => this.store.dispatch([new LoadingFalse(), new LogoutFailed(err)]));
  }

  @Action([LoginSuccessful, Authenticated])
  navigateToHome() {
    window.location.reload();
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action([LogoutSuccessful])
  refreshAndNavigateToLogin() {
    window.location.reload();
  }

  @Action([NotAuthenticated])
  navigateToLogin() {
    return this.store.dispatch([new LoadingFalse(), new Navigate([''])]);
  }

}


