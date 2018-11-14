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

export class SearchForProduct {
  static readonly type = '[Product] Search for product';

  constructor(public  searchQuery: { query: string }) {
  }
}

export class ProductFounded {
  static readonly type = '[Product] Product founded';

  constructor(public resultProducts: any[]) {
  }
}

export class ErrorInProductSearch {
  static readonly type = '[Product] Error: error in Product search';

  constructor(public  err: string) {
  }
}
