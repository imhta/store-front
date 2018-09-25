export class CheckAuthState {
  static readonly type = '[Auth] Checking Auth State';
}

export class Authenticated {
  static readonly type = '[Auth] Already Authenticated';
}

export class NotAuthenticated {
  static readonly type = '[Auth] Not already Authenticated';
}

export class Login {
  static readonly type = '[Auth] Attempt Login';
}

export class LoginSuccessful {
  static readonly type = '[Auth] Login Successful';
}

export class LoginFailed {
  static readonly type = '[Auth] Login Attempt Failed';

  constructor(public  error: string) {
    console.log(this.error);
  }
}


export class Logout {
  static readonly type = '[Auth] Attempt Logout';
}

export class LogoutSuccessful {
  static readonly type = '[Auth] Logout Successful';

}

export class LogoutFailed {
  static readonly type = '[Auth] Logout Attempt Failed';

  constructor(public  error: string) {
  }
}
