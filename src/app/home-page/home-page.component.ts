import {Component, OnInit} from '@angular/core';
import {AuthState} from '../shared/state/auth.state';
import {Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {LoadingTrue} from '../shared/state/loading.state';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subscription} from 'rxjs';
import {SingleProductModel, WholeProducts} from '../shared/models/product.model';
import {GetAllProducts} from '../shared/actions/products.actions';


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
  filters = {
    location: 'Coimbatore',
    categories: {
      gender: 'Men'
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
  };

  constructor(private config: NgbCarouselConfig, private store: Store) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    this.store.dispatch([new LoadingTrue(), new GetAllProducts()]);
    this.productsSubscription = this.$productsState.subscribe((data) => {
      this.wholeProducts = data;
      this.products = this.wholeProducts.products.slice(0, 10);
    });
  }

  ngOnInit() {
    this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
  }


  navigateWithFilters(path: string) {
    switch (path) {
      case 'Men': {
        this.filters.categories.gender = 'Men';
        this.store.dispatch([new Navigate(['products'], {filter: JSON.stringify(this.filters)})]);
        break;
      }
      case 'Women': {
        this.filters.categories.gender = 'Women';
        this.store.dispatch([new Navigate(['products'], {filter: JSON.stringify(this.filters)})]);
        break;
      }
      case 'Boy': {
        this.filters.categories.gender = 'Boy';
        this.store.dispatch([new Navigate(['products'], {filter: JSON.stringify(this.filters)})]);
        break;
      }
      case 'Girl': {
        this.filters.categories.gender = 'Girl';
        this.store.dispatch([new Navigate(['products'], this.filters)]);
        break;
      }
      case 'Formals': {
        this.filters.occasion = 'Formals';
        this.store.dispatch([new Navigate(['products'], this.filters)]);
        break;
      }
      case 'Casuals': {
        this.filters.occasion = 'Casuals';
        this.store.dispatch([new Navigate(['products'], this.filters)]);
        break;
      }
      case 'Wedding': {
        this.filters.occasion = 'Wedding';
        this.store.dispatch([new Navigate(['products'], this.filters)]);
        break;
      }
      case 'Sports': {
        this.filters.occasion = 'Sports';
        this.store.dispatch([new Navigate(['products'], this.filters)]);
        break;
      }
    }
  }

  scrollLeft() {
    document.getElementById('scrolling-wrapper').scrollLeft = document.getElementById('scrolling-wrapper').scrollLeft + 50;

  }

  scrollRight() {
    document.getElementById('scrolling-wrapper').scrollLeft = document.getElementById('scrolling-wrapper').scrollLeft - 50;

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


}
