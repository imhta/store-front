export class GetStoreDetails {
  static readonly type = '[Store-Catalog] Get Store Details';

  constructor(public usn: string) {
  }
}

export class GotStoreDetailsSuccessfully {
  static readonly type = '[Store-Catalog] Got store details successfully';

  constructor(public storeDetails: {}) {
  }
}

export class ErrorInGettingStoreDetails {
  static readonly type = '[Error] Getting store details';

  constructor(public error: string) {
  }
}

export class GetStoreProducts {
  static readonly type = '[Store-Catalog] Get store products';

  constructor(public storeUid: string) {
  }
}

export class GotStoreProductsSuccessfully {
  static readonly type = '[Store-Catalog] Got store products successfully';

  constructor(public storeProducts: object[]) {
  }
}

export class ErrorInGettingStoreProducts {
  static readonly type = '[Error] Getting store products';

  constructor(public error: string) {
  }
}

export class StoreNotFound {
  static readonly type = '[Store-Catalog] Store not found';
}

export class StoreProductsNotFound {
  static readonly type = '[Store-Catalog] Store products not found';
}

export class SearchForProductInCatalog {
  static readonly type = '[Store-Catalog] Search for product in catalog';

  constructor(public  searchQuery: { storeId: string, query: string }) {
  }
}

export class ProductFoundedInCatalog {
  static readonly type = '[Store-Catalog] Product founded';

  constructor(public resultProducts: any[]) {
  }
}

export class ErrorInProductSearchInCatalog {
  static readonly type = '[Store-Catalog] Error: error in Product search';

  constructor(public  err: string) {
  }
}
