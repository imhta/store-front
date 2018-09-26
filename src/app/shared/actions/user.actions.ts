export class SetFavorite {
  static readonly type = '[User] Set favorite';

  constructor(public favorites: string[]) {
  }
}

export class SetFavoriteSuccessfully {
  static readonly type = '[User] Set favorite successfully';

  constructor(public favorites: string[]) {
  }
}

