import {Action, State, StateContext, Store} from '@ngxs/store';
import {ErrorInGettingAllProducts, GetAllProducts, GotAllProductsSuccessfully, SearchForProduct} from '../actions/products.actions';
import {FirestoreService} from '../services/firestore-service/firestore.service';
import {LoadingFalse} from './loading.state';
import {SingleProductModel, WholeProducts} from '../models/product.model';
import {
  AddedToCartSuccessfully,
  AddedToFavoriteSuccessfully,
  AddToCart,
  AddToFavorite,
  ErrorInAddingCart,
  ErrorInAddingFavorite,
  ErrorInGettingFavorite,
  ErrorInRemovingItemFromCart,
  ErrorInRemovingItemFromFavorite,
  GetAllFavorites,
  GotFavoritesSuccessfully,
  RemovedFromCartSuccessfully,
  RemovedFromFavoriteSuccessfully,
  RemoveFromCart,
  RemoveFromFavorite,
} from '../actions/user.actions';
import {HttpService} from '../services/http/http.service';


@State<WholeProducts>({
  name: 'products',
  defaults: {
    products: [],
    favorites: [],
    cartedProducts: [],
    cartedProductsWithDetail: []
  }
})
export class ProductsState {
  constructor(private dbService: FirestoreService, private  store: Store, private httpService: HttpService) {
  }

  @Action(GetAllProducts)
  getAllProducts() {
    const allProducts: SingleProductModel[] = [];
    this.dbService.getAllProducts().then((data) => {
      data.forEach((product) => {
        const productModel = new SingleProductModel();
        productModel.fromFireData(product.data());
        return allProducts.push(productModel);
      });

      this.store.dispatch([new GotAllProductsSuccessfully(allProducts)]);
    }).catch((err) => {
      this.store.dispatch([new ErrorInGettingAllProducts(err)]);
    });
  }

  @Action(GotAllProductsSuccessfully)
  gotAllProductsSuccessfully(ctx: StateContext<WholeProducts>, {allProducts}: GotAllProductsSuccessfully) {
    const state = ctx.getState();
    ctx.setState({...state, products: allProducts});
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(ErrorInGettingAllProducts)
  errorInGettingAllProducts(ctx: StateContext<WholeProducts>, {error}: ErrorInGettingAllProducts) {
    console.log(error);
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(AddToFavorite)
  addToFavorite(ctx: StateContext<WholeProducts>, {productUid}: AddToFavorite) {
    this.dbService.addToFavorite(productUid)
      .then(() => this.store.dispatch([new AddedToFavoriteSuccessfully(productUid)]))
      .catch((err) => this.store.dispatch([new ErrorInAddingFavorite(err)]));
  }

  @Action(AddToCart)
  addToCart(ctx: StateContext<WholeProducts>, {productUid}: AddToCart) {
    this.dbService.addToCart(productUid)
      .then(() => this.store.dispatch([new AddedToCartSuccessfully(productUid)]))
      .catch((err) => this.store.dispatch([new ErrorInAddingCart(err)]));
  }

  @Action(RemoveFromFavorite)
  removeFromFavorite(ctx: StateContext<WholeProducts>, {productUid}: RemoveFromFavorite) {
    this.dbService.removeFromFavorite(productUid)
      .then(() => this.store.dispatch([new RemovedFromFavoriteSuccessfully(productUid)]))
      .catch((err) => this.store.dispatch([new ErrorInRemovingItemFromFavorite(err)]));
  }

  @Action(RemoveFromCart)
  removeFromCart(ctx: StateContext<WholeProducts>, {productUid}: RemoveFromCart) {
    this.dbService.removeFromCart(productUid)
      .then(() => this.store.dispatch([new RemovedFromCartSuccessfully(productUid)]))
      .catch((err) => this.store.dispatch([new ErrorInRemovingItemFromCart(err)]));
  }

  @Action(GetAllFavorites)
  getAllFavorites() {
    this.dbService.getAllFavorites().catch((err) => this.store.dispatch([new ErrorInGettingFavorite(err)]));
  }

  // @Action(GetAllCarts)
  // getAllCarts() {
  //   this.dbService.getAllCartItems().catch((err) => this.store.dispatch([new ErrorInGettingCarts(err)]));
  // }

  @Action(GotFavoritesSuccessfully)
  gotAllFavorites(ctx: StateContext<WholeProducts>, {favorites}: GotFavoritesSuccessfully) {
    const state = ctx.getState();
    ctx.setState({...state, favorites: favorites});
  }

  //
  // @Action(GotCartsSuccessfully)
  // gotAllCarts(ctx: StateContext<WholeProducts>, {carts}: GotCartsSuccessfully) {
  //   const state = ctx.getState();
  //   ctx.setState({...state, cartedProducts: carts});
  // }
  //
  // @Action(GetAllCartProducts)
  // getAllCartProducts(ctx: StateContext<WholeProducts>, {products}: GetAllCartProducts) {
  //   this.dbService.getAllCartedProducts(products);
  // }

  // @Action(GotCartProductsSuccessfully)
  // gotAllCartProductsSuccessfully(ctx: StateContext<WholeProducts>, {products}: GotCartProductsSuccessfully) {
  //   const state = ctx.getState();
  //   ctx.setState({...state, cartedProductsWithDetail: products});
  //   return this.store.dispatch([new LoadingFalse()]);
  // }

  @Action(SearchForProduct)
  searchForProduct(cxt: StateContext<any[]>, {searchQuery}: SearchForProduct) {
    this.httpService.searchForProduct(searchQuery);
  }
}
