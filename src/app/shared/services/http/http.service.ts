import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {ProductFoundedInCatalog} from '../../actions/store-catalog.actions';
import {ProductFounded} from '../../actions/products.actions';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private store: Store) {
  }

  searchForProductInCatalog(searchQuery) {
    this.http
      .post('https://us-central1-clothxnet.cloudfunctions.net/algoliaSearch/store_search', searchQuery)
      .subscribe((res: any[]) => this.store.dispatch([new ProductFoundedInCatalog(res)]));
  }

  searchForProduct(searchQuery) {
    console.log(searchQuery);
    this.http
      .post('https://us-central1-clothxnet.cloudfunctions.net/algoliaSearch/product_search', searchQuery)
      .subscribe((res: any[]) => this.store.dispatch([new ProductFounded(res)]));
  }
}
