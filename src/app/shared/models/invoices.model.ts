import Timestamp = firebase.firestore.Timestamp;
import GeoPoint = firebase.firestore.GeoPoint;

export class InvoiceModel {
  invoiceId: string;
  customerNumber: string;
  customerName: string;
  cartProducts: object[] = [];
  typeOfPayment: 'Card' | 'Cash' | 'Cash & Card';
  isDiscountApplied = false;
  discount: object = {};
  discountPrice = 0;
  totalPrice: number;
  totalQuantity: number;
  gstNumber: string;
  hasNoGstNumber: boolean;
  totalTax: number;
  storeUid: string;
  sendSms: boolean;
  storeDetails: InvoiceStoreDetails;
  customerFeedback: CustomerFeedback;
  createdOn: Timestamp;
  billedBy: string;

  constructor() {
    this.customerNumber = '';
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.totalTax = 0;
    this.sendSms = true;
  }

  fromJson(data) {
    this.customerNumber = data.customerNumber;
    this.customerName = data.customerName;
    this.cartProducts = data.cartProducts;
    this.typeOfPayment = data.typeOfPayment;
    this.billedBy = data.billedBy;
    this.totalPrice = data.totalPrice;
    this.totalQuantity = data.totalQuantity;
    this.createdOn = data.createdOn;
    this.totalTax = data.totalTax;
    this.invoiceId = data.invoiceId;
    this.storeUid = data.storeUid;
    this.hasNoGstNumber = data.hasNoGstNumber;
    this.discount = data.discount;
    this.isDiscountApplied = data.isDiscountApplied;
    this.discountPrice = data.discountPrice;
  }

  // cartProductsToJson(arrayOfProducts: CartProduct[]) {
  //   this.cartProducts = [];
  //   this.totalQuantity = 0;
  //   this.totalPrice = 0;
  //   this.totalTax = 0;
  //   arrayOfProducts.forEach((product) => {
  //     this.totalQuantity = this.totalQuantity + product.totalQuantity;
  //     this.totalPrice = this.totalPrice + product.totalPrice;
  //     this.totalTax = this.totalTax + product.totalTax;
  //     this.cartProducts.push(product.toJson());
  //   });
  // }

  toJson() {
    return {
      'customerNumber': this.customerNumber,
      'customerName': this.customerName,
      'cartProducts': this.cartProducts,
      'discount': this.discount,
      'isDiscountApplied': this.isDiscountApplied,
      'typeOfPayment': this.typeOfPayment,
      'billedBy': this.billedBy,
      'gstNumber': this.gstNumber,
      'hasNoGstNumber': this.hasNoGstNumber,
      'discountPrice': this.discountPrice,
      'totalPrice': this.totalPrice,
      'totalQuantity': this.totalQuantity,
      'totalTax': this.totalTax,
      'storeUid': this.storeUid,
      'sendSms': this.sendSms,
      'storeDetails': this.storeDetails,
      'customerFeedback': this.customerFeedback,
      'createdOn': Timestamp.now(),
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

export class CustomerFeedback {
  feedbackText = '';
  reaction = '';
  createdOn: Timestamp;

  toJson() {
    return {
      'feedbackText': this.feedbackText,
      'reaction': this.reaction,
      'createdOn': Timestamp.now()
    };
  }
}

export interface InvoiceStoreDetails {
  storeName: string;
  mobileNumber: string;
  address: object;
  location: GeoPoint;
  gstNumber: string;
  storeLogo: string;
}
