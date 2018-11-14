import {Component, OnInit} from '@angular/core';
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
  searchQuery: { storeId: string, query: string } = {storeId: '', query: ''};

  constructor(private route: ActivatedRoute, private store: Store, private actions$: Actions) {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.param = params['usn'];
      this.store.dispatch([new GetStoreDetails(params['usn'])]);
    });
    this.storeCatalogSubscription = this.$storeCatalog.subscribe((data) => {
      this.storeCatalog = data;
      this.searchQuery.storeId = this.storeCatalog.storeDetails['storeUid'];
    });
    this.actions$
      .pipe(ofActionDispatched(StoreNotFound))
      .subscribe(() => this.isNotFound = false);
    this.actions$
      .pipe(ofActionDispatched(StoreProductsNotFound))
      .subscribe(() => this.isProductFound = false);
  }

  ngOnInit() {
  }

  onChange() {
    this.resultProduct = [];
  }

  search() {
    this.store.dispatch([new LoadingTrue(), new SearchForProductInCatalog(this.searchQuery)]);
    this.actions$.pipe(ofActionDispatched(ProductFoundedInCatalog), take(5)).subscribe(({resultProducts}) => {
      this.resultProduct = resultProducts;
      this.store.dispatch([new LoadingFalse()]);
    });
  }

  navigateHome() {
    this.store.dispatch([new Navigate([''])]);
  }
}
