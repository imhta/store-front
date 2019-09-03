import {Action, State, StateContext} from '@ngxs/store';


export class LoadingTrue {
  static readonly type = '[App] Loading..';
}

export class LoadingFalse {
  static readonly type = '[App] Loading Completed..';
}

@State<boolean>({
  name: 'loading',
  defaults: false
})
export class LoadingState {

  @Action(LoadingTrue)
  loadingTrue({setState}: StateContext<boolean>) {
    return setState(true);
  }

  @Action(LoadingFalse)
  loadingFalse({setState}: StateContext<boolean>) {
    return setState(false);
  }
}
