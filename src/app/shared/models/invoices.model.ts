export class InvoiceModel {
  invoiceId: string;
  customerNumber: string;
  cartProducts: object[];
  typeOfPayment: 'Card' | 'Cash' | 'Cash & Card';
  totalPrice: number;
  totalQuantity: number;
  totalTax: number;
  storeUid: string;
  createdOn: Date;
  billedBy: string;

  constructor() {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.totalTax = 0;
  }

  fromJson(data) {
    this.customerNumber = data['customerNumber'];
    this.cartProducts = data['cartProducts'];
    this.typeOfPayment = data['typeOfPayment'];
    this.billedBy = data['billedBy'];
    this.totalPrice = data['totalPrice'];
    this.totalQuantity = data['totalQuantity'];
    this.createdOn = data['createdOn'];
    this.totalTax = data['totalTax'];
    this.invoiceId = data['invoiceId'];
    this.storeUid = data['storeUid'];
  }

  cartProductsToJson(arrayOfProducts: CartProduct[]) {
    this.cartProducts = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.totalTax = 0;
    arrayOfProducts.forEach((product) => {
      this.totalQuantity = this.totalQuantity + product.totalQuantity;
      this.totalPrice = this.totalPrice + product.totalPrice;
      this.totalTax = this.totalTax + product.totalTax;
      this.cartProducts.push(product.toJson());
    });
  }

  toJson() {
    return {
      'customerNumber': this.customerNumber,
      'cartProducts': this.cartProducts,
      'typeOfPayment': this.typeOfPayment,
      'billedBy': this.billedBy,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'totalTax': this.totalTax,
      'storeUid': this.storeUid,
      'createdOn': Date.now(),
      'invoiceId': this.invoiceId ? this.invoiceId : '',
      'pending': true
    };
  }

}

export class CartProduct {
  prn: string;
  productName: string;
  typeOfProduct: string;
  material: string;
  size: string;
  singleUnitPrice: number;
  totalQuantity: number;
  maxQuantity: number;
  totalPrice: number;
  taxInPercentage: number;
  totalTax: number;
  differentSizes: object[];
  selectedSize: number;

  constructor() {
    this.maxQuantity = 0;
  }

  fromJson(data) {
    this.prn = data['prn'];
    this.productName = data['productName'];
    this.typeOfProduct = data['type'];
    this.size = data['size'] ? data['size'] : '';
    this.singleUnitPrice = data['singleUnitPrice'];
    this.totalQuantity = data['totalQuantity'];
    this.maxQuantity = data['maxQuantity'];
    this.totalPrice = data['totalPrice'];
    this.totalTax = data['totalTax'];
    this.taxInPercentage = data['taxInPercentage'];
  }

  calculateProductTotal() {
    this.totalPrice = this.singleUnitPrice * this.totalQuantity;
    this.totalTax = this.totalPrice * (this.taxInPercentage / 100);
  }

  toJson() {
    return {
      'prn': this.prn,
      'productName': this.productName,
      'size': this.size ? this.size : '',
      'singleUnitPrice': this.singleUnitPrice,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'maxQuantity': this.maxQuantity,
      'totalTax': this.totalTax,
      'typeOfProduct': this.typeOfProduct,
      'taxInPercentage': this.taxInPercentage
    };
  }

}

