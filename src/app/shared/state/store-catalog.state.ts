import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../services/firestore-service/firestore.service';
import {LoadingFalse} from './loading.state';
import {
  ErrorInGettingStoreDetails,
  ErrorInGettingStoreProducts,
  GetStoreDetails,
  GetStoreProducts,
  GotStoreDetailsSuccessfully,
  GotStoreProductsSuccessfully,
  SearchForProductInCatalog,
  StoreNotFound,
  StoreProductsNotFound
} from '../actions/store-catalog.actions';
import {HttpService} from '../services/http/http.service';

@State<any>({
  name: 'storeCatalog',
  defaults: {
    storeDetails: {},
    products: [],
  }
})
export class StoreCatalogState {
  constructor(private dbService: FirestoreService, private  store: Store, private httpService: HttpService) {
  }

  @Action(GetStoreProducts)
  getStoreProducts(ctx: StateContext<any>, {storeUid}: GetStoreProducts) {
    const storeProducts = [];
    this.dbService.getStoreProducts(storeUid).then(async (data) => {
      if (data.empty) {
        return this.store.dispatch([new StoreProductsNotFound()]);
      } else {
        await data.forEach((doc) => storeProducts.push(doc.data()));
        return this.store.dispatch([new GotStoreProductsSuccessfully(storeProducts)]);
      }
    }).catch((err) => this.store.dispatch([new ErrorInGettingStoreProducts(err)]));

  }

  @Action(GotStoreProductsSuccessfully)
  gotStoreProductsSuccessfully(ctx: StateContext<any>, {storeProducts}: GotStoreProductsSuccessfully) {
    const state = ctx.getState();
    ctx.setState({...state, products: storeProducts});
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(ErrorInGettingStoreProducts)
  errorInGettingStoreProducts(ctx: StateContext<any>, {error}: ErrorInGettingStoreProducts) {
    console.log(error);
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(GetStoreDetails)
  getStoreDetails(ctx: StateContext<any>, {usn}: GetStoreDetails) {
    this.dbService.getStoreDetails(usn).then((data) => {
      if (data.empty) {
        return this.store.dispatch([new StoreNotFound()]);
      } else {
        data.forEach((doc) =>
          this.store.dispatch([new GotStoreDetailsSuccessfully(doc.data()), new GetStoreProducts(doc.id)]));
      }
    }).catch((err) => this.store.dispatch([new ErrorInGettingStoreDetails(err)]));
  }

  @Action(GotStoreDetailsSuccessfully)
  gotStoreDetailsSuccessfully(ctx: StateContext<any>, {storeDetails}: GotStoreDetailsSuccessfully) {
    const state = ctx.getState();
    ctx.setState({...state, storeDetails: storeDetails});
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(ErrorInGettingStoreDetails)
  errorInGettingStoreDetails(ctx: StateContext<any>, {error}: ErrorInGettingStoreDetails) {
    console.log(error);
    return this.store.dispatch([new LoadingFalse()]);
  }

  @Action(SearchForProductInCatalog)
  searchForProduct(cxt: StateContext<any[]>, {searchQuery}: SearchForProductInCatalog) {
    this.httpService.searchForProductInCatalog(searchQuery);
  }

}
