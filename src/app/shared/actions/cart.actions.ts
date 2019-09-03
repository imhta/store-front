import {CartedProduct, SingleProductModel} from '../models/product.model';

export class GetAllCartProducts {
  static readonly type = '[Cart] Get all cart products';

  constructor(public products: CartedProduct[]) {
  }
}

export class GotCartProductsSuccessfully {
  static readonly type = '[Cart] Got all cart products successfully';

  constructor(public products: SingleProductModel[]) {
  }
}

export class ErrorInGettingCartProducts {
  static readonly type = '[Cart] Getting cart products';

  constructor(public err: string) {
  }
}

