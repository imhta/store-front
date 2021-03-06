import {Component, OnInit} from '@angular/core';
import {ProductFounded, ProductNextPage, ProductNextPageFounded, SearchForProduct} from '../../shared/actions/products.actions';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {LoadingFalse, LoadingTrue} from '../../shared/state/loading.state';
import {Observable} from 'rxjs';
import {SingleProductModel, WholeProducts} from '../../shared/models/product.model';
import {AuthState} from '../../shared/state/auth.state';
import {take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {FilterBoxComponent} from '../../filter-box/filter-box.component';
import {SortBoxComponent} from '../../sort-box/sort-box.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ActivatedRoute, Router} from '@angular/router';
import {Navigate} from '@ngxs/router-plugin';
import {SeoService} from '../../shared/services/seo/seo.service';
import * as firebase from 'firebase';
import GeoPoint = firebase.firestore.GeoPoint;

@Component({
  selector: 'cx-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  @Select('products') $productsState: Observable<WholeProducts>;
  products: SingleProductModel[];
  pageEmpty = false;
  isLoggedIn: boolean;
  resultProduct: SingleProductModel[] = [];
  searchQuery: {
    query: string,
    location: { latlong: GeoPoint, locationAccuracy: number, locationTimeStamp: number },
    filters: object
    sortBy: string,
    page: number
  } = {
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
        inMax: 10000,
        min: 0,
        max: 10000
      },
      size: '',
      occasion: '',
      allowOutOfStock: false
    }, sortBy: 'high2low', page: 0
  };
  isLocated = false;
  screenWidth = window.screen.width;
  private temp: SingleProductModel;

  constructor(
    private store: Store,
    private actions$: Actions,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService
  ) {
    this.locateStore();
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Products Page',
      description: 'Find nearby fashion destination',
      image: 'https://spoteasy.in/assets/logo.png',
      slug: 'products'
    });
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {page: 0}, {queryParamsHandling: 'merge'})]);

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


  createSearchParams() {
    if (typeof (this.searchQuery.filters) === 'object') {

      this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {
        query: this.searchQuery.query,
        filters: JSON.stringify(this.searchQuery.filters),
        sortBy: 'high2low',
        page: 0
      }, {queryParamsHandling: 'merge'})]);
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
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {
          query: this.searchQuery.query,
          page: this.searchQuery.page
        }, {queryParamsHandling: 'merge'})]);
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
        this.store.dispatch([new Navigate([this.router.url.split('?')[0]], {page: 0}, {queryParamsHandling: 'merge'})]);
        this.updateParams();
        // @ts-ignore
        this.store
          .dispatch([
            new LoadingTrue(),
            new SearchForProduct(this.searchQuery)
          ]);
        this.actions$.pipe(ofActionDispatched(ProductFounded), take(5)).subscribe(({resultProducts}) => {

          if (this.searchQuery.page === 0) {
            this.resultProduct = resultProducts;
            // console.log(this.resultProduct);
            this.store.dispatch([new LoadingFalse()]);
          }
          // console.log(this.resultProduct);
        });
        break;
      }
    }

  }

  updateParams() {
    return this.store.dispatch([
      new Navigate([this.router.url.split('?')[0]],
        {query: this.searchQuery.query, location: this.searchQuery.location},
        {queryParamsHandling: 'merge'})]);
  }

  onChange() {
    if (this.searchQuery.query === '') {
      this.search();
    }

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
      this.updateParams();
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
