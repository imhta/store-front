import {CartedProduct, FavProduct} from '../models/product.model';

export class GetAllCarts {
  static readonly type = '[User] Get all cart';

}

export class GotCartsSuccessfully {
  static readonly type = '[User] Got carts successfully';

  constructor(public carts: CartedProduct[]) {
  }
}

export class ErrorInGettingCarts {
  static readonly type = '[Error] Getting carts';

  constructor(public err: string) {
  }
}

export class GetAllFavorites {
  static readonly type = '[User] Get all favorite';

}

export class GotFavoritesSuccessfully {
  static readonly type = '[User] Got favorites successfully';

  constructor(public favorites: FavProduct[]) {
  }
}

export class ErrorInGettingFavorite {
  static readonly type = '[Error] Getting favorite';

  constructor(public err: string) {
  }
}

export class AddToFavorite {
  static readonly type = '[User] Add to favorite';

  constructor(public productUid: string) {
  }
}

export class AddedToFavoriteSuccessfully {
  static readonly type = '[User] Added to favorite successfully';

  constructor(public productUid: string) {
  }
}

export class ErrorInAddingFavorite {
  static readonly type = '[Error] Adding to favorite';

  constructor(public err: string) {
  }
}

export class RemoveFromFavorite {
  static readonly type = '[User] Remove from Favorite';

  constructor(public productUid: string) {
  }
}

export class RemovedFromFavoriteSuccessfully {
  static readonly type = '[User] removed from Favorite successfully';

  constructor(public productUid: string) {
  }
}


export class ErrorInRemovingItemFromFavorite {
  static readonly type = '[Error] Removing item from Favorite';

  constructor(public err: string) {
  }
}

export class AddToCart {
  static readonly type = '[User] Add to cart';

  constructor(public productUid: string) {
  }
}

export class AddedToCartSuccessfully {
  static readonly type = '[User] Added to cart successfully';

  constructor(public productUid: string) {
  }
}

export class ErrorInAddingCart {
  static readonly type = '[Error] Adding to cart';

  constructor(public err: string) {
  }
}

export class RemoveFromCart {
  static readonly type = '[User] Remove from cart';

  constructor(public productUid: string) {
  }
}

export class RemovedFromCartSuccessfully {
  static readonly type = '[User] removed from cart successfully';

  constructor(public productUid: string) {
  }
}


export class ErrorInRemovingItemFromCart {
  static readonly type = '[Error] Removing item from cart';

  constructor(public err: string) {
  }
}

