import {OnInit} from '@angular/core';
import Timestamp = firebase.firestore.Timestamp;
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export class SingleProductModel implements OnInit {
  productUid: string;
  productName: string;
  prn: string;
  brandName: string;
  categories: { category1: string, category2: string, colorCategory: string };
  description: string;
  gender: 'Men' | 'Women' | 'Boy' | 'Girl';
  picturesUrl: string[] = [];
  picturesPath: string[] = [];
  isDeleted: boolean;
  isVariantsWithSamePrice: boolean;
  hasNoGstNumber: boolean;
  variants: { size: string, stock: number, purchasedPrice: number, sellingPrice: number }[];
  addedBy: string;
  storeId: string;
  tags: string[];
  taxType: 'footwear' | 'textile' | 'other';
  otherTax: number;
  hsnCode: string;
  inclusiveAllTaxes: boolean;
  createdOn: Timestamp;
  isListable: boolean;
  isFavorite: boolean;
  isCart: boolean;
  lastModified: Timestamp;
  storeDetails: { address: { city: string, pinCode: number, state: string, street: string }, location: GeoPoint, name: string };
  cloudinaryUrls: object[];

  constructor() {
    this.isListable = false;
  }

  ngOnInit() {
    this.isFavorite = false;
    this.isCart = false;
  }

  fromFormData(data) {
    this.gender = data.gender;
    this.brandName = data.brandName;
    this.productName = data.productName;
    this.categories = data.categories;
    this.description = data.description;
    this.variants = data.variants;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
    this.tags = data.tags;
    this.taxType = data.taxType;
    this.hsnCode = data.hsnCode;
    this.otherTax = +data.otherTax;
    this.inclusiveAllTaxes = data.inclusiveAllTaxes;
    this.isVariantsWithSamePrice = data.isVariantsWithSamePrice;
    this.hasNoGstNumber = data.hasNoGstNumber;
  }

  fromFireData(data) {
    this.gender = data.gender;
    this.brandName = data.brandName;
    this.productName = data.productName;
    this.categories = data.categories;
    this.description = data.description;
    this.variants = data.variants;
    this.addedBy = data.addedBy;
    this.storeId = data.storeId;
    this.tags = data.tags;
    this.taxType = data.taxType;
    this.hsnCode = data.hsnCode;
    this.otherTax = +data.otherTax;
    this.inclusiveAllTaxes = data.inclusiveAllTaxes;
    this.isVariantsWithSamePrice = data.isVariantsWithSamePrice;
    this.hasNoGstNumber = data.hasNoGstNumber;
    this.productUid = data.productUid;

    this.prn = data.prn;

    this.picturesUrl = data.picturesUrl;
    this.picturesPath = data.picturesPath;
    this.createdOn = data.createdOn;
    this.lastModified = data.lastModified;
  }

  toJson() {
    return {
      'brandName': this.brandName,
      'productName': this.productName,
      'description': this.description,
      'categories': this.categories,
      'gender': this.gender,
      'isVariantsWithSamePrice': this.isVariantsWithSamePrice,
      'variants': this.variants,
      'picturesPath': this.picturesPath,
      'picturesUrl': this.picturesUrl,
      'tags': this.tags,
      'hasNoGstNumber': this.hasNoGstNumber,
      'taxType': this.taxType,
      'otherTax': this.otherTax,
      'hsnCode': this.hsnCode,
      'inclusiveAllTaxes': this.inclusiveAllTaxes,
      'addedBy': this.addedBy,
      'storeId': this.storeId,
      'createdOn': Timestamp.now(),
      'isListable': this.isListable,
      'isDeleted': false
    };
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
