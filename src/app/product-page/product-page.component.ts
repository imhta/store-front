import {Component, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {LoadingFalse, LoadingTrue} from '../shared/state/loading.state';
import {
  GettingProduct,
  GettingRecommendedStoreProducts,
  GotProductSuccessfully,
  GotRecommendedStoreProductsSuccessfully,
  ProductNotFound
} from '../shared/actions/products.actions';
import {SingleProductModel} from '../shared/models/product.model';
import {take} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {SeoService} from '../shared/services/seo/seo.service';

@Component({
  selector: 'cx-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productId;
  product: SingleProductModel;
  selectedImg: string;
  recommendedProducts: SingleProductModel[];

  constructor(
    private store: Store,
    private actions$: Actions,
    private route: ActivatedRoute,
    private seo: SeoService
  ) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.productId = params.id;
        this.store.dispatch([new LoadingTrue(), new GettingProduct(this.productId)]);
      }
    });
    this.actions$
      .pipe(ofActionDispatched(GotProductSuccessfully), take(5))
      .subscribe(({product}) => {
        this.product = product;
        this.selectedImg = this.product.picturesUrl[0];
        if (product) {
          this.seo.generateTags({
            title: this.product.productName + '' + 'from' + '' + this.product.storeDetails.name,
            description: this.product.brandName + ' ' + this.product.description + ' ' + this.product.gender,
            image: this.product.picturesUrl[0],
            slug: 'product/' + this.product.productUid
          });
        }
        this.store.dispatch([new LoadingFalse(), new GettingRecommendedStoreProducts(this.product.storeId)]);
      });
    this.actions$
      .pipe(ofActionDispatched(GotRecommendedStoreProductsSuccessfully), take(5))
      .subscribe(({recommendedProducts}) =>
        this.recommendedProducts = recommendedProducts
          .filter((product) => product.productUid !== this.productId));
    this.actions$
      .pipe(ofActionDispatched(ProductNotFound), take(5))
      .subscribe(() => console.log('product not found'));
  }

  ngOnInit() {

  }

  scrollLeft() {
    document.getElementById('scrolling-wrapper').scrollLeft = document.getElementById('scrolling-wrapper').scrollLeft + 50;

  }

  scrollRight() {
    document.getElementById('scrolling-wrapper').scrollLeft = document.getElementById('scrolling-wrapper').scrollLeft - 50;

  }

  navigateToProduct(productUid: string) {
    this.store.dispatch(new Navigate(['/product', productUid]));
  }

}
