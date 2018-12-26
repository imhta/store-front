import {Component, OnInit} from '@angular/core';
import {ProductFounded, ProductNextPage, ProductNextPageFounded, SearchForProduct} from '../../shared/actions/products.actions';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {LoadingFalse, LoadingTrue} from '../../shared/state/loading.state';
import {Observable, Subscription} from 'rxjs';
import {SingleProductModel, WholeProducts} from '../../shared/models/product.model';
import {AuthState} from '../../shared/state/auth.state';
import {take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {FilterBoxComponent} from '../../filter-box/filter-box.component';
import {SortBoxComponent} from '../../sort-box/sort-box.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ActivatedRoute, Router} from '@angular/router';
import {Navigate} from '@ngxs/router-plugin';

@Component({
  selector: 'cx-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  @Select('products') $productsState: Observable<WholeProducts>;
  productsSubscription: Subscription;
  favSubscription: Subscription;
  cartsSubscription: Subscription;
  wholeProducts: WholeProducts;
  products: SingleProductModel[];
  showSelectedPrice;
  pageEmpty = false;
  isLoggedIn: boolean;
  resultProduct: SingleProductModel[] = [];
  searchQuery: { query: string, filters: object, sortBy: string, page: number } = {
    query: '', filters: {
      location: 'Coimbatore',
      categories: {
        gender: 'All'
      },
      price: {
        inMin: 0,
        inMax: 10000,
        min: 0,
        max: 10000
      },
      size: '',
      occasion: '',
      allowOutOfStock: false
    }, sortBy: '', page: 0
  };
  screenWidth = window.screen.width;
  private temp: SingleProductModel;

  constructor(
    private store: Store,
    private actions$: Actions,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);

    // this.favSubscription = this.actions$
    //   .pipe(ofActionSuccessful(GotFavoritesSuccessfully))
    //   .subscribe(() => {
    //     this.updateFav();
    //   });
    // this.cartsSubscription = this.actions$
    //   .pipe(ofActionSuccessful(GotCartsSuccessfully))
    //   .subscribe(() => {
    //     this.updateCarts();
    //   });
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {page: 0})]);

        if (params && params.filters && params.sortBy) {
          if (params.filters.length > 0 && params.sortBy.length > 0) {
            console.log(params.query);
            this.searchQuery.query = params.query ? params.query : '';
            this.searchQuery.filters = JSON.parse(params.filters);
            this.searchQuery.sortBy = params.sortBy;
            this.search();
          }
        } else {
          this.createSearchParams();

          this.search();
        }

      });
  }

  updateQueryParams() {

    return this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {query: this.searchQuery.query})]);
  }

  createSearchParams() {
    if (typeof (this.searchQuery.filters) === 'object') {
      return this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {
        query: this.searchQuery.query,
        filters: JSON.stringify(this.searchQuery.filters),
        sortBy: '',
        page: 0
      }, {queryParamsHandling: 'merge'})]);
    } else {
      return this.store.dispatch([new Navigate([this.router.url.split('?')[0]], this.searchQuery)]);
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


  search(choice?) {

    switch (choice) {
      case 'next': {
        this.searchQuery.page++;
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {query: this.searchQuery.query, page: this.searchQuery.page})]);
        // @ts-ignore
        this.store
          .dispatch([
            new LoadingTrue(),
            new ProductNextPage(this.searchQuery)
          ]);
        this.actions$.pipe(ofActionDispatched(ProductNextPageFounded), take(5)).subscribe(({resultProducts}) => {

          if (this.searchQuery.page > 0 && resultProducts.length > 0) {
            resultProducts.forEach((product) => this.resultProduct.push(product));

            this.store.dispatch([new LoadingFalse()]);
          } else {
            this.pageEmpty = true;
            this.store.dispatch([new LoadingFalse()]);
          }

        });
        break;
      }
      default : {
        this.pageEmpty = false;
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {page: 0})]);
        this.updateQueryParams();
        // @ts-ignore
        this.store
          .dispatch([
            new LoadingTrue(),
            new SearchForProduct(this.searchQuery)
          ]);
        this.actions$.pipe(ofActionDispatched(ProductFounded), take(5)).subscribe(({resultProducts}) => {

          if (this.searchQuery.page === 0) {
            this.resultProduct = resultProducts;
            console.log(this.resultProduct);
            this.store.dispatch([new LoadingFalse()]);
          }
          console.log(this.resultProduct);
        });
        break;
      }
    }

  }

  // updateFav() {
  //   this.products.forEach((product) => {
  //     this.wholeProducts.favorites.forEach((favProduct) => {
  //       if (product.productUid === favProduct.productUid) {
  //         product.isFavorite = favProduct.isFav;
  //       }
  //     });
  //   });
  // }
  //
  // updateCarts() {
  //   this.products.forEach((product) => {
  //     this.wholeProducts.cartedProducts.forEach((cartItem) => {
  //       if (product.productUid === cartItem.productUid) {
  //         product.isCart = cartItem.isCart;
  //       }
  //     });
  //   });
  // }


  // addToFavorite(productUid: string) {
  //   this.temp = this.products.filter((product) => product.productUid === productUid)[0];
  //   if (this.temp.isFavorite) {
  //     this.store.dispatch([new RemoveFromFavorite(productUid)]);
  //     this.temp.isFavorite = !this.temp.isFavorite;
  //   } else {
  //     this.store.dispatch([new AddToFavorite(productUid)]);
  //     this.temp.isFavorite = !this.temp.isFavorite;
  //   }
  //
  // }
  //
  // addToCart(productUid: string) {
  //   this.temp = this.products.filter((product) => product.productUid === productUid)[0];
  //   if (this.temp.isCart) {
  //     this.store.dispatch([new RemoveFromCart(productUid)]);
  //     this.temp.isCart = !this.temp.isCart;
  //   } else {
  //     this.store.dispatch([new AddToCart(productUid)]);
  //     this.temp.isCart = !this.temp.isCart;
  //   }
  //
  // }

  navigateToProduct(productUid: string) {
    this.store.dispatch(new Navigate(['/product', productUid]));
  }

}
