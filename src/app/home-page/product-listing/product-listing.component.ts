import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetAllProducts, ProductFounded, SearchForProduct} from '../../shared/actions/products.actions';
import {Actions, ofActionDispatched, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {LoadingFalse, LoadingTrue} from '../../shared/state/loading.state';
import {Observable, Subscription} from 'rxjs';
import {SingleProductModel, WholeProducts} from '../../shared/models/product.model';
import {
  AddToCart,
  AddToFavorite,
  GotCartsSuccessfully,
  GotFavoritesSuccessfully,
  RemoveFromCart,
  RemoveFromFavorite
} from '../../shared/actions/user.actions';
import {AuthState} from '../../shared/state/auth.state';
import {take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {FilterBoxComponent} from '../../filter-box/filter-box.component';
import {SortBoxComponent} from '../../sort-box/sort-box.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cx-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  @Select('products') $productsState: Observable<WholeProducts>;
  productsSubscription: Subscription;
  favSubscription: Subscription;
  cartsSubscription: Subscription;
  wholeProducts: WholeProducts;
  products: SingleProductModel[];
  showSelectedPrice;
  isLoggedIn: boolean;
  resultProduct: SingleProductModel[] = [];
  searchQuery: { query: string } = {query: ''};
  screenWidth = window.screen.width;
  queryParam;
  private temp: SingleProductModel;

  constructor(
    private store: Store,
    private actions$: Actions,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute
  ) {
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
    this.store.dispatch([new LoadingTrue(), new GetAllProducts()]);
    this.productsSubscription = this.$productsState.subscribe((data) => {
      this.wholeProducts = data;
      this.products = this.wholeProducts.products;
    });
    this.favSubscription = this.actions$
      .pipe(ofActionSuccessful(GotFavoritesSuccessfully))
      .subscribe(() => {
        this.updateFav();
      });
    this.cartsSubscription = this.actions$
      .pipe(ofActionSuccessful(GotCartsSuccessfully))
      .subscribe(() => {
        this.updateCarts();
      });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.length > 0) {
          console.log(params);

          this.queryParam = JSON.parse(params.filter);
          this.localSorting(params['sortBy']);
        }

      });
  }

  localSorting(sortBy) {
    switch (sortBy) {
      case 'low2high': {

        break;
      }
      case 'high2low': {
        break;
      }
      case 'newestFirst': {
        break;
      }
      default: {
        break;
      }
    }
  }

  openFilter(): void {
    const dialogRef = this.dialog.open(FilterBoxComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSortBottomSheet(): void {
    this.bottomSheet.open(SortBoxComponent);
  }

  onChange() {
    if (this.searchQuery.query.length === 0) {
      this.resultProduct = [];
    }
  }

  search() {

    // @ts-ignore
    this.store
      .dispatch([
        new LoadingTrue(),
        new SearchForProduct(this.searchQuery)
      ]);
    this.actions$.pipe(ofActionDispatched(ProductFounded), take(5)).subscribe(({resultProducts}) => {
      if (resultProducts.length >= 0) {
        this.resultProduct = resultProducts;
        console.log(this.resultProduct);
        this.store.dispatch([new LoadingFalse()]);
      }
      console.log(this.resultProduct);
    });
  }

  updateFav() {
    this.products.forEach((product) => {
      this.wholeProducts.favorites.forEach((favProduct) => {
        if (product.productUid === favProduct.productUid) {
          product.isFavorite = favProduct.isFav;
        }
      });
    });
  }

  updateCarts() {
    this.products.forEach((product) => {
      this.wholeProducts.cartedProducts.forEach((cartItem) => {
        if (product.productUid === cartItem.productUid) {
          product.isCart = cartItem.isCart;
        }
      });
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.favSubscription.unsubscribe();
    this.cartsSubscription.unsubscribe();
  }

  addToFavorite(productUid: string) {
    this.temp = this.products.filter((product) => product.productUid === productUid)[0];
    if (this.temp.isFavorite) {
      this.store.dispatch([new RemoveFromFavorite(productUid)]);
      this.temp.isFavorite = !this.temp.isFavorite;
    } else {
      this.store.dispatch([new AddToFavorite(productUid)]);
      this.temp.isFavorite = !this.temp.isFavorite;
    }

  }

  addToCart(productUid: string) {
    this.temp = this.products.filter((product) => product.productUid === productUid)[0];
    if (this.temp.isCart) {
      this.store.dispatch([new RemoveFromCart(productUid)]);
      this.temp.isCart = !this.temp.isCart;
    } else {
      this.store.dispatch([new AddToCart(productUid)]);
      this.temp.isCart = !this.temp.isCart;
    }

  }
}
