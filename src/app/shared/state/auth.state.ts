import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {LoginModel} from '../models/auth.model';
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
import {LoadingFalse} from './loading.state';
import {delay} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';

@State<LoginModel>({
  name: 'user',
  defaults: null
})
export class AuthState {
  constructor(private authService: AuthService, private  store: Store) {
  }

  @Selector()
  static uid(state: LoginModel) {
    return state.uid;
  }

  @Selector()
  static token(state: LoginModel) {
    return state.token;
  }

  @Action(CheckAuthState)
  async checkAuthState({setState}: StateContext<LoginModel>) {

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
  async login({setState}: StateContext<LoginModel>) {
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
  async logout({setState}: StateContext<LoginModel>) {
    await this.authService.signOut()
      .then(() => {
        setState(null);
        return this.store.dispatch(new LogoutSuccessful());
      })
      .catch((err) => this.store.dispatch([new LoadingFalse(), new LogoutFailed(err)]));
  }

  @Action([LoginSuccessful, Authenticated])
  navigateToHome() {
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action([LogoutSuccessful])
  refreshAndNavigateToLogin() {
    window.location.reload();
  }

  @Action([NotAuthenticated])
  navigateToLogin() {
    return this.store.dispatch([new LoadingFalse()]);
  }

}


