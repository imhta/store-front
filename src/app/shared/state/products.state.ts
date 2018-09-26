import {Action, State, StateContext, Store} from '@ngxs/store';
import {ErrorInGettingAllProducts, GetAllProducts, GotAllProductsSuccessfully} from '../actions/products.actions';
import {FirestoreService} from '../services/firestore-service/firestore.service';
import {LoadingFalse} from './loading.state';
import {SingleProductModel} from '../models/product.model';
import {SetFavorite, SetFavoriteSuccessfully} from '../actions/user.actions';


@State<SingleProductModel[]>({
  name: 'products',
  defaults: []
})
export class ProductsState {
  constructor(private dbService: FirestoreService, private  store: Store) {
  }

  @Action(GetAllProducts)
  getAllProducts() {
    const allProducts: SingleProductModel[] = [];
    this.dbService.getAllProducts().then((data) => {
      data.forEach((product) => {
        const tempProduct = new SingleProductModel();
        tempProduct.fromJson(product.data());
        allProducts.push(tempProduct);
      });

      this.store.dispatch([new GotAllProductsSuccessfully(allProducts)]);
    }).catch((err) => {
      this.store.dispatch([new ErrorInGettingAllProducts(err)]);
    });
  }

  @Action(GotAllProductsSuccessfully)
  gotAllProductsSuccessfully(cxt: StateContext<SingleProductModel[]>, {allProducts}: GotAllProductsSuccessfully) {
    cxt.setState(allProducts);
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(ErrorInGettingAllProducts)
  errorInGettingAllProducts(cxt: StateContext<SingleProductModel[]>, {error}: ErrorInGettingAllProducts) {
    console.log(error);
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(SetFavorite)
  setFavorite(cxt: StateContext<SingleProductModel[]>, {favorites}: SetFavorite) {

  }

  @Action(SetFavoriteSuccessfully)
  setFavoriteSuccessfully(cxt: StateContext<SingleProductModel[]>, {favorites}: SetFavoriteSuccessfully) {

  }
}
