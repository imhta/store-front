import {SingleProductModel} from '../models/product.model';

export class GetAllProducts {
  static readonly type = '[Products] Get all products';
}

export class GotAllProductsSuccessfully {
  static readonly type = '[Products] Got all products successfully';

  constructor(public allProducts: SingleProductModel[]) {
  }
}

export class ErrorInGettingAllProducts {
  static readonly type = '[Error] Getting all products';

  constructor(public error: string) {
  }
}
