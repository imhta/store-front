import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {
  GetStoreDetails,
  ProductFoundedInCatalog,
  ProductNextPageFoundedInCatalog,
  ProductNextPageInCatalog,
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
import {SeoService} from '../shared/services/seo/seo.service';
import * as firebase from 'firebase';
import GeoPoint = firebase.firestore.GeoPoint;

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
  searchQuery: {
    storeId: string,
    location: { latlong: GeoPoint, locationAccuracy: number, locationTimeStamp: number },
    query: string, filters: object, sortBy: string, page: number
  } = {
    storeId: '',
    query: '',
    location: {
      latlong: null,
      locationAccuracy: null,
      locationTimeStamp: null
    },
    filters: {
      location: 'Coimbatore',
      categories: {
        gender: 'All'
      },
      price: {
        inMin: 0,
        inMax: 100000,
        min: 0,
        max: 100000
      },
      size: '',
      occasion: '',
      allowOutOfStock: false
    },
    sortBy: 'high2low',
    page: 0
  };
  screenWidth = window.screen.width;
  pageEmpty = false;
  regNoSpace = /^[^-\s][a-zA-Z0-9_\s-]+$/;
  isLocated = false;

  constructor(private route: ActivatedRoute,
              private store: Store,
              private actions$: Actions,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private router: Router,
              private seo: SeoService) {
    this.locateStore();
    this.route.params.pipe(take(1)).subscribe(params => {
      this.param = params['usn'];
      this.store.dispatch([new GetStoreDetails(params['usn'])]);
    });
    this.storeCatalogSubscription = this.$storeCatalog.subscribe((data) => {
      this.storeCatalog = data;
      this.searchQuery.storeId = this.storeCatalog.storeDetails['storeUid'];
      if (this.regNoSpace.test(this.searchQuery.storeId) && this.searchQuery.storeId) {
        this.seo.generateTags({
          title: this.storeCatalog.storeDetails['storeName']
            + ' '
            + this.storeCatalog.storeDetails['address']['city']
            + ' '
            + this.storeCatalog.storeDetails['address']['state'],
          description: this.storeCatalog.storeDetails['description'],
          image: this.storeCatalog.storeDetails['storeLogo']['localDownloadUrl'],
          slug: 'store/' + this.storeCatalog.storeDetails['usn']
        });
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
        if (this.regNoSpace.test(this.searchQuery.storeId) && this.searchQuery.storeId) {
          console.log(this.searchQuery.storeId);
          this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {
              storeId: this.storeCatalog.storeDetails['storeUid'],
              page: 0
            }, {queryParamsHandling: 'merge'}
          )]);

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
        }
      });

  }

  updateQueryParams() {

    return this.store.dispatch([
      new Navigate([
        this.router.url.split('?')[0]], {
        query: this.searchQuery.query,
        location: this.searchQuery.location,
      }, {queryParamsHandling: 'merge'})
    ]);
  }

  createSearchParams() {
    if (typeof (this.searchQuery.filters) === 'object') {

      return this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {
        storeId: this.searchQuery.storeId,
        query: this.searchQuery.query,
        filters: JSON.stringify(this.searchQuery.filters),
        sortBy: 'high2low',
        page: 0
      }, {queryParamsHandling: 'merge'})]);
    } else {
      return this.store.dispatch([new Navigate([this.router.url.split('?')[0]], this.searchQuery, {queryParamsHandling: 'merge'})]);
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
        this.store.dispatch([
          new Navigate([
            this.router.url.split('?')[0]], {
            query: this.searchQuery.query,
            page: this.searchQuery.page
          }, {queryParamsHandling: 'merge'})
        ]);
        // @ts-ignore
        this.store
          .dispatch([
            new LoadingTrue(),
            new ProductNextPageInCatalog(this.searchQuery)
          ]);
        this.actions$.pipe(ofActionDispatched(ProductNextPageFoundedInCatalog), take(5)).subscribe(({resultProducts}) => {

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
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {page: 0}, {queryParamsHandling: 'merge'})]);
        this.updateQueryParams();
        // @ts-ignore
        this.store
          .dispatch([
            new LoadingTrue(),
            new SearchForProductInCatalog(this.searchQuery)
          ]);
        this.actions$.pipe(ofActionDispatched(ProductFoundedInCatalog), take(5)).subscribe(({resultProducts}) => {

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

  getImageOpUrl(url: string) {
    url = url.slice(0, 49) + 'q_80,h_250/' + url.slice(49 + Math.abs(0));
    return url;
  }

  locateStore() {
    this.getGeoLocation().then(() => {
      this.isLocated = true;
      this.updateQueryParams();
    });
  }

  getGeoLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.searchQuery.location.latlong = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
            this.searchQuery.location.locationAccuracy = position.coords.accuracy;
            this.searchQuery.location.locationTimeStamp = position.timestamp;
            console.log(this.searchQuery.location, this.searchQuery.location.locationTimeStamp);
            resolve();
          },
          (err) => {
            alert('Please enable your GPS position future.');
            reject();
          }, {maximumAge: 1, timeout: 10000, enableHighAccuracy: true}
        );
      } else {
        console.log('Geo location not supported');
        reject();
      }


    });
  }
}
