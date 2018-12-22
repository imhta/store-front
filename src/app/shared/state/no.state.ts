import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../services/firestore-service/firestore.service';
import {GetInvoiceById, SaveCustomerFeedback} from '../actions/invoice.actions';
import {
  ErrorInGettingRecommendedStoreProducts,
  GettingProduct,
  GettingRecommendedStoreProducts,
  GotRecommendedStoreProductsSuccessfully
} from '../actions/products.actions';
import {SingleProductModel} from '../models/product.model';

@State<null>({
  name: 'no',
  defaults: null
})
export class NoState {
  constructor(private db: FirestoreService, private  store: Store) {
  }

  @Action(GetInvoiceById)
  getInvoiceById(ctx: StateContext<null>, {invoiceUid}: GetInvoiceById) {
    return this.db.getInvoiceById(invoiceUid);
  }

  @Action(SaveCustomerFeedback)
  updateFeedback(ctx: StateContext<null>, {invoiceId, feedback}: SaveCustomerFeedback) {
    return this.db.updateFeedback(invoiceId, feedback);
  }

  @Action(GettingProduct)
  gettingProduct(ctx: StateContext<null>, {productId}: GettingProduct) {
    return this.db.getProduct(productId);
  }

  @Action(GettingRecommendedStoreProducts)
  gettingRecommendedStoreProducts(ctx: StateContext<null>, {storeId}: GettingRecommendedStoreProducts) {
    return this.db.getStoreProducts(storeId)
      .subscribe((data: SingleProductModel[]) => this.store.dispatch([new GotRecommendedStoreProductsSuccessfully(data)]),
        error1 => this.store.dispatch([new ErrorInGettingRecommendedStoreProducts(error1)]));
  }
}
