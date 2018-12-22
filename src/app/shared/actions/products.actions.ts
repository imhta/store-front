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

export class ProductNextPage {
  static readonly type = '[Product] Search for NextPage';

  constructor(public  searchQuery: { query: string }) {
  }
}

export class ProductNextPageFounded {
  static readonly type = '[Product] Search for NextPage Founded';

  constructor(public resultProducts: any[]) {
  }
}

export class ErrorInNextPage {
  static readonly type = '[Product]  Error in Search for NextPage';

  constructor(public  err: string) {
  }
}

export class GettingProduct {
  static readonly type = '[Product] Getting product';

  constructor(public productId: string) {
  }
}

export class ProductNotFound {
  static readonly type = '[Product] Requested Product not found';
}

export class GotProductSuccessfully {
  static readonly type = '[Product] Got product successfully';

  constructor(public product: object) {
  }
}

export class ErrorInGettingProduct {
  static readonly type = '[Error] Getting product';

  constructor(public error: string) {
  }
}

export class GettingRecommendedStoreProducts {
  static readonly type = '[Product] Getting Recommended Store Products';

  constructor(public storeId: string) {
  }
}

export class GotRecommendedStoreProductsSuccessfully {
  static readonly type = '[Product] Got Recommended Store Products Successfully';

  constructor(public recommendedProducts: SingleProductModel[]) {
  }
}

export class ErrorInGettingRecommendedStoreProducts {
  static readonly type = '[Error] Error In Getting Recommended Store Products';

  constructor(public error: string) {
  }
}
