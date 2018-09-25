import {Action, State, StateContext, Store} from '@ngxs/store';
import {ErrorInGettingAllProducts, GetAllProducts, GotAllProductsSuccessfully} from '../actions/products.actions';
import {FirestoreService} from '../services/firestore-service/firestore.service';
import {LoadingFalse} from './loading.state';


@State<any[]>({
  name: 'products',
  defaults: null
})
export class ProductsState {
  constructor(private dbService: FirestoreService, private  store: Store) {
  }

  @Action(GetAllProducts)
  getAllProducts(cxt: StateContext<any[]>) {
    this.dbService.getAllProducts().then((data) => {
      const allProducts = [];
      data.forEach((product) => {
        allProducts.push(product.data());
      });
      console.log(allProducts);
    }).catch((err) => {
      console.log(err);
    });
  }

  @Action(GotAllProductsSuccessfully)
  gotAllProductsSuccessfully() {
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(ErrorInGettingAllProducts)
  errorInGettingAllProducts(cxt: StateContext<any[]>, {error}: ErrorInGettingAllProducts) {
    console.log(error);
    return this.store.dispatch([new LoadingFalse()]);
  }
}
