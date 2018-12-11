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

  // scrollHandler(e) {
  //   console.log(e);
  // }
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


}
