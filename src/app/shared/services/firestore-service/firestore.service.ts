import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import {Store} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {CartedProduct, FavProduct, SingleProductModel} from '../../models/product.model';
import {GotCartsSuccessfully, GotFavoritesSuccessfully} from '../../actions/user.actions';
import {GotCartProductsSuccessfully} from '../../actions/cart.actions';
import {
  CustomerFeedbackSavedSuccessfully,
  ErrorInGettingInvoiceById,
  ErrorInSavingCustomerFeedback,
  GotInvoiceByIdSuccessfully,
  InvoiceNotFoundById
} from '../../actions/invoice.actions';
import {CustomerFeedback, InvoiceModel} from '../../models/invoices.model';
import {LoadingFalse} from '../../state/loading.state';
import {ErrorInGettingProduct, GotProductSuccessfully, ProductNotFound} from '../../actions/products.actions';
import {Navigate} from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  uid: string;
  favCollectionRef: CollectionReference = this.db.collection(`favorites`).ref;
  cartsCollectionRef: CollectionReference = this.db.collection(`carts`).ref;
  productsCollectionRef: CollectionReference = this.db.collection(`products`).ref;

  constructor(private db: AngularFirestore, private store: Store) {

  }

  getStoreDetails(usn: string) {
    return this.db.collection(`stores`).ref
      .where('usn', '==', usn)
      .limit(1)
      .get();
  }

  getStoreProducts(storeUid: string) {
    return this.db.collection(`products`, ref =>
      ref
        .where('storeId', '==', storeUid)
        .where('isListable', '==', true)
        .where('isDeleted', '==', false))
      .valueChanges();

  }

  getAllProducts() {
    return this.db.collection(`products`, ref =>
      ref
        .where('isListable', '==', true)
        .where('isDeleted', '==', false)
        .orderBy('createdOn', 'desc')
        .orderBy('productName'))
      .valueChanges();
  }

  async getAllFavorites() {
    this.uid = this.store.selectSnapshot(AuthState.uid);
    console.log(this.uid);
    if (this.uid) {
      const allFavorites: FavProduct[] = [];
      await this.favCollectionRef
        .where('userUid', '==', this.uid)
        .get().then((docs) => docs.forEach((data) => {
          allFavorites.push(new FavProduct(data.data()));
        }));
      this.store.dispatch([new GotFavoritesSuccessfully(allFavorites)]);
    }

  }

  async getAllCartItems() {
    this.uid = this.store.selectSnapshot(AuthState.uid);
    if (this.uid) {
      const allCart: CartedProduct[] = [];
      await this.cartsCollectionRef
        .where('userUid', '==', this.uid)
        .get().then((docs) => docs.forEach((data) => {
          allCart.push(new CartedProduct(data.data()));
        }));
      this.store.dispatch([new GotCartsSuccessfully(allCart)]);
    }
  }

  addToFavorite(productUid: string) {
    this.uid = this.store.selectSnapshot(AuthState.uid);
    const fav: FavProduct = new FavProduct({
      'userUid': this.uid,
      'productUid': productUid,
      'isFav': true,
      'lastModified': Date.now()
    });
    if (this.uid) {

      return this.favCollectionRef
        .where('userUid', '==', this.uid)
        .where('productUid', '==', productUid)
        .limit(1)
        .get()
        .then((doc) => {
          doc.size === 0 ? this.favCollectionRef.add(fav.toJson()) : doc.forEach((data) => data.ref.set({
            'isFav': true,
            'lastModified': Date.now()
          }, {merge: true}));
        });


    }
  }

  removeFromFavorite(productUid: string) {
    this.uid = this.store.selectSnapshot(AuthState.uid);
    if (this.uid) {
      return this.db.collection(`favorites`).ref
        .where('userUid', '==', this.uid)
        .where('productUid', '==', productUid)
        .limit(1)
        .get()
        .then((data) => data.forEach((doc) => doc.ref.set({'isFav': false, 'lastModified': Date.now()}, {merge: true})));
    }
  }

  addToCart(productUid: string) {
    this.uid = this.store.selectSnapshot(AuthState.uid);
    if (this.uid) {
      const cartItem: CartedProduct = new CartedProduct({
        'userUid': this.uid,
        'productUid': productUid,
        'isCart': true,
        'lastModified': Date.now()
      });
      return this.cartsCollectionRef
        .where('userUid', '==', this.uid)
        .where('productUid', '==', productUid)
        .limit(1)
        .get()
        .then((doc) => {
          doc.size === 0 ? this.cartsCollectionRef.add(cartItem.toJson()) : doc.forEach((data) => data.ref.set({
            'isCart': true,
            'lastModified': Date.now()
          }, {merge: true}));
        });
    }
  }

  removeFromCart(productUid: string) {
    this.uid = this.store.selectSnapshot(AuthState.uid);
    if (this.uid) {
      return this.db.collection(`carts`).ref
        .where('userUid', '==', this.uid)
        .where('productUid', '==', productUid)
        .limit(1)
        .get()
        .then((data) => data.forEach((doc) => doc.ref.set({'isCart': false, 'lastModified': Date.now()}, {merge: true})));
    }
  }

  getAllCartedProducts(cartedProducts: CartedProduct[]) {
    const cartedProductsWithDetail: SingleProductModel[] = [];
    const cartProduct = new SingleProductModel();
    for (let i = 0; i < cartedProducts.length; i++) {
      if (cartedProducts[i].isCart) {
        this.productsCollectionRef
          .where('productUid', '==', cartedProducts[i].productUid)
          .limit(1)
          .get()
          .then(
            (doc) => doc.forEach((data) => {
              // cartProduct.fromJson(data.data());
              // cartedProductsWithDetail.push(cartProduct);
              }
            ));
      }
    }
    return this.store.dispatch([new GotCartProductsSuccessfully(cartedProductsWithDetail)]);
  }

  getInvoiceById(invoiceId: string) {
    this.db.doc(`invoices/${invoiceId}`).ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          return this.store.dispatch([new GotInvoiceByIdSuccessfully(doc.data() as InvoiceModel)]);
        }
        this.store.dispatch([new InvoiceNotFoundById()]);
      })
      .catch((err) => this.store.dispatch([new ErrorInGettingInvoiceById(err)]));
  }

  updateFeedback(invoiceId: string, feedback: CustomerFeedback) {
    this.db.doc(`invoices/${invoiceId}`)
      .set({'feedback': feedback.toJson()}, {merge: true})
      .then(() => this.store.dispatch([new CustomerFeedbackSavedSuccessfully(), new LoadingFalse()]))
      .catch((err) => this.store.dispatch([new ErrorInSavingCustomerFeedback(err), new LoadingFalse()]));
  }

  getProduct(productId: string) {
    this.db
      .collection('products')
      .doc(`${productId}`).ref
      .get()
      .then((product) => {
          if (product.exists) {
            this.store.dispatch([new GotProductSuccessfully(product.data())]);
          } else {
            this.store.dispatch([new ProductNotFound()]);
          }
        }
      ).catch((err) => this.store.dispatch([new ErrorInGettingProduct(err)]));
  }

  getStoreWithUsn(limit: number) {
    return this.db.collection('stores').ref
      .orderBy('usn', 'asc')
      .limit(limit)
      .get();
  }
}
