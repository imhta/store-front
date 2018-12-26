import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {
  GetStoreDetails,
  ProductFoundedInCatalog,
  SearchForProductInCatalog,
  StoreNotFound,
  StoreProductsNotFound
} from '../shared/actions/store-catalog.actions';
import {take} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {SingleProductModel} from '../shared/models/product.model';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingFalse, LoadingTrue} from '../shared/state/loading.state';
import {FilterBoxComponent} from '../filter-box/filter-box.component';
import {SortBoxComponent} from '../sort-box/sort-box.component';
import {MatBottomSheet, MatDialog} from '@angular/material';

@Component({
  selector: 'cx-store-catalogue',
  templateUrl: './store-catalogue.component.html',
  styleUrls: ['./store-catalogue.component.scss']
})
export class StoreCatalogueComponent implements OnInit {
  @Select('storeCatalog') $storeCatalog: Observable<{ products: SingleProductModel[], storeDetails: {} }>;
  storeCatalog: { products: SingleProductModel[], storeDetails: {} };
  storeCatalogSubscription: Subscription;
  showSelectedPrice;
  isNotFound = true;
  isProductFound = true;
  param;
  resultProduct: any[] = [];
  searchQuery: { storeId: string, query: string, filters: object, sortBy: string, page: number } = {
    storeId: '',
    query: '',
    filters: {},
    sortBy: '',
    page: 0
  };
  screenWidth = window.screen.width;
  queryParam;

  constructor(private route: ActivatedRoute,
              private store: Store,
              private actions$: Actions,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet) {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.param = params['usn'];
      this.store.dispatch([new GetStoreDetails(params['usn'])]);
    });
    this.storeCatalogSubscription = this.$storeCatalog.subscribe((data) => {
      this.storeCatalog = data;
      this.searchQuery.storeId = this.storeCatalog.storeDetails['storeUid'];
      if (this.searchQuery.storeId) {
        this.search();
      }
    });
    this.actions$
      .pipe(ofActionDispatched(StoreNotFound))
      .subscribe(() => this.isNotFound = false);
    this.actions$
      .pipe(ofActionDispatched(StoreProductsNotFound))
      .subscribe(() => this.isProductFound = false);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.searchQuery.filters = JSON.parse(params.filter);
        this.searchQuery.sortBy = params.sortBy;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      console.log('bottom');
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


  search() {
    this.store.dispatch([new Navigate(['products'], this.searchQuery)]);
    this.store
      .dispatch([
        new LoadingTrue(),
        new SearchForProductInCatalog(this.searchQuery)
      ]);
    this.actions$.pipe(ofActionDispatched(ProductFoundedInCatalog), take(5)).subscribe(({resultProducts}) => {
      if (resultProducts.length >= 0) {
        this.resultProduct = resultProducts;
        console.log(this.resultProduct);
        this.store.dispatch([new LoadingFalse()]);
      }
      console.log(this.resultProduct);
    });
  }

  onChange() {
    if (this.searchQuery.query === '') {
      this.search();
    }

  }

  navigateHome() {
    this.store.dispatch([new Navigate([''])]);
  }

  navigateToProduct(productUid: string) {
    this.store.dispatch(new Navigate(['/product', productUid]));
  }

}
