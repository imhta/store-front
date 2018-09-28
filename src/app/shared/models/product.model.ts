import {OnInit} from '@angular/core';

export class SingleProductModel implements OnInit {
  productUid: string;
  prn: string;
  productName: string;
  category: string;
  description: string;
  gender: 'Male' | 'Female' | 'Boy' | 'Girl';
  picturesUrl: string[] = [];
  picturesPath: string[] = [];
  isDeleted: boolean;
  ssp: { size: string, stock: number, price: number }[];
  addedBy: string;
  storeId: string;
  createdOn: Date;
  isListable: boolean;
  isFavorite: boolean;
  isCart: boolean;
  lastModified: Date;

  constructor() {
  }

  ngOnInit() {
    this.isFavorite = false;
    this.isCart = false;
  }

  fromJson(data) {
    this.gender = data['gender'];
    this.productName = data['productName'];
    this.category = data['category'];
    this.description = data['description'];
    this.ssp = data['ssp'];
    this.addedBy = data['addedBy'];
    this.storeId = data['storeId'];
    this.productUid = data['productUid'];
    this.prn = data['prn'];
    this.picturesUrl = data['picturesUrl'];
    this.picturesPath = data['picturesPath'];
    this.createdOn = data['createdOn'];
  }
}

export class FavProduct {
  productUid: string;
  userUid: string;
  isFav: boolean;
  lastModified: Date;

  constructor(data) {
    this.productUid = data.productUid;
    this.userUid = data.userUid;
    this.isFav = data.isFav;
    this.lastModified = data.lastModified;
  }

  toJson() {
    return {
      'productUid': this.productUid,
      'userUid': this.userUid,
      'isFav': this.isFav,
      'lastModified': Date.now()
    };
  }
}

export class CartedProduct {
  productUid: string;
  userUid: string;
  isCart: boolean;
  lastModified: Date;

  constructor(data) {
    this.productUid = data.productUid;
    this.userUid = data.userUid;
    this.isCart = data.isCart;
    this.lastModified = data.lastModified;
  }

  toJson() {
    return {
      'productUid': this.productUid,
      'userUid': this.userUid,
      'isCart': this.isCart,
      'lastModified': Date.now()
    };
  }
}

export interface WholeProducts {
  products: SingleProductModel[];
  favorites: FavProduct[];
  cartedProducts: CartedProduct[];
  cartedProductsWithDetail: SingleProductModel[];
}
