import {Component, OnInit} from '@angular/core';
import {AuthState} from '../shared/state/auth.state';
import {Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingTrue} from '../shared/state/loading.state';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subscription} from 'rxjs';
import {SingleProductModel, WholeProducts} from '../shared/models/product.model';
import {GetAllProducts} from '../shared/actions/products.actions';
import {SeoService} from '../shared/services/seo/seo.service';
import {FirestoreService} from '../shared/services/firestore-service/firestore.service';


@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Select('products') $productsState: Observable<WholeProducts>;
  productsSubscription: Subscription;
  wholeProducts: WholeProducts;
  products: SingleProductModel[];
  isLoggedIn: boolean;
  storesWithUsn = [];
  filters = {
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
  };
  searchQuery = '';

  constructor(private config: NgbCarouselConfig, private store: Store, private seo: SeoService, private  dbService: FirestoreService) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    this.store.dispatch([new LoadingTrue(), new GetAllProducts()]);
    this.productsSubscription = this.$productsState.subscribe((data) => {
      this.wholeProducts = data;
      this.products = this.wholeProducts.products.slice(0, 10);
    });
    this.dbService.getStoreWithUsn(6).then((data) => {
      this.storesWithUsn = [];
      data.forEach((doc) => this.storesWithUsn.push(doc.data()));
      console.log(this.storesWithUsn);
    });
  }

  ngOnInit() {
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
    this.seo.generateTags({
      title: 'Home Page',
      description: 'Explore fashion',
      image: 'https://spoteasy.in/assets/logo.png',
      slug: 'home'
    });
  }


  navigateWithFilters(path: string) {
    switch (path) {
      case 'Men': {
        this.filters.categories.gender = 'Men';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Women': {
        this.filters.categories.gender = 'Women';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Boy': {
        this.filters.categories.gender = 'Boy';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Girl': {
        this.filters.categories.gender = 'Girl';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Formals': {
        this.filters.occasion = 'Formals';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Casuals': {
        this.filters.occasion = 'Casuals';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Wedding': {
        this.filters.occasion = 'Wedding';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
      case 'Sports': {
        this.filters.occasion = 'Sports';
        this.store.dispatch([new Navigate(['products'], {
          filters: JSON.stringify(this.filters),
          sortBy: 'high2low',
          page: 0
        }, {queryParamsHandling: 'merge'})]);
        break;
      }
    }
  }

  scrollLeft() {
    document.getElementById('scrolling-wrapper').scrollLeft = document.getElementById('scrolling-wrapper').scrollLeft + 150;

  }

  scrollRight() {
    document.getElementById('scrolling-wrapper').scrollLeft = document.getElementById('scrolling-wrapper').scrollLeft - 150;

  }

  navigateTo(path: string) {
    if (this.isLoggedIn) {
      return this.store.dispatch([new LoadingTrue(), new Navigate([path])]);
    } else {
      console.log('not logged in');
    }
  }

  navigateToProduct(productUid: string) {
    this.store.dispatch(new Navigate(['/product', productUid]));
  }


  search() {
    console.log('s', this.searchQuery);
    this.store.dispatch([
      new Navigate(['products'], {
        query: this.searchQuery, filters: JSON.stringify(this.filters),
        sortBy: 'high2low',
        page: 0
      }, {queryParamsHandling: 'merge'})]);
  }

  getImageOpUrl(url: string) {
    url = url.slice(0, 49) + 'q_80,w_200,h_250/' + url.slice(49 + Math.abs(0));
    return url;
  }

  browseStore(usn) {
    this.store.dispatch([new Navigate(['store', usn])]);
  }
}
