import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SingleProductModel, WholeProducts} from '../shared/models/product.model';
import {CartProduct, InvoiceModel} from '../shared/models/invoices.model';

@Component({
  selector: 'cx-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  @Select('products') $allProducts: Observable<WholeProducts>;
  wholeProducts: WholeProducts;
  allCartProducts: SingleProductModel[];
  prn: string;
  cartProducts: CartProduct[] = [];
  invoice = new InvoiceModel();

  constructor(private store: Store, private $actions: Actions) {
  }

  ngOnInit() {
    // this.$allProducts.pipe(first())
    //   .subscribe((allProducts: WholeProducts) => {
    //     this.wholeProducts = allProducts;
    //     return this.store.dispatch([new GetAllCartProducts(this.wholeProducts.cartedProducts)]);
    //   });
    //
    // this.$actions.pipe(ofActionSuccessful(GotCartProductsSuccessfully)).subscribe(() => {
    //   this.allCartProducts = this.wholeProducts.cartedProductsWithDetail;
    //   return this.renderCart();
    // });

  }

  ngOnDestroy() {
  }

  // renderCart() {
  //   const cartProduct = new CartProduct();
  //   for (let i = 0; i < this.allCartProducts.length; i++) {
  //     cartProduct.differentSizes = this.allCartProducts[i].ssp;
  //     const lengthOfAvailableSize = cartProduct.differentSizes.length;
  //     if (lengthOfAvailableSize > 0) {
  //       if (parseFloat(this.allCartProducts[i]['stock']) === 0 || parseFloat(this.allCartProducts[i]['stock']) < 0) {
  //         console.log('out of stock');
  //       } else {
  //         // default selection of size
  //         cartProduct.selectedSize = 0;
  //         cartProduct.size = cartProduct.differentSizes[cartProduct.selectedSize]['size'];
  //         cartProduct.singleUnitPrice = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['price']);
  //         cartProduct.maxQuantity = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['stock']);
  //
  //         console.log(this.allCartProducts[i]);
  //         cartProduct.prn = this.allCartProducts[i].prn;
  //         cartProduct.typeOfProduct = this.allCartProducts[i].category;
  //         cartProduct.productName = this.allCartProducts[i].productName;
  //         cartProduct.singleUnitPrice < 1000 ? cartProduct.taxInPercentage = 5 : cartProduct.taxInPercentage = 12;
  //         cartProduct.totalQuantity = 1;
  //         this.calculateTotal(cartProduct);
  //         this.cartProducts.push(cartProduct);
  //         this.calculateInvoiceTotal();
  //         console.log(this.invoice);
  //       }
  //
  //     } else {
  //       return console.log('Product does not exits');
  //     }
  //
  //   }
  //
  //
  // }
  //
  // selectSize(cartProduct: CartProduct, index: number) {
  //   cartProduct.selectedSize = index;
  //   cartProduct.size = cartProduct.differentSizes[cartProduct.selectedSize]['size'];
  //   cartProduct.singleUnitPrice = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['price']);
  //   cartProduct.maxQuantity = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['stock']);
  //   this.calculateTotal(cartProduct);
  // }
  //
  // calculateTotal(product) {
  //   product.calculateProductTotal();
  //   this.calculateInvoiceTotal();
  // }
  //
  // calculateInvoiceTotal() {
  //   this.invoice.cartProductsToJson(this.cartProducts);
  //   console.log(this.invoice);
  // }

// this function for check whether product exits, disabled for add same product of multiple size
  // checkProduct(prn) {
  //   return this.cartProducts.filter(product => product.prn === prn).length === 0;
  // }


}
