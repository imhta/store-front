import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {ProductFoundedInCatalog} from '../../actions/store-catalog.actions';
import {ProductFounded, ProductNextPageFounded} from '../../actions/products.actions';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private store: Store) {
  }

  searchForProductInCatalog(searchQuery) {
    return this.http
      .post(`https://us-central1-${environment.config.projectId}.cloudfunctions.net/algoliaSearch/search/store`, searchQuery)
      .subscribe((res: any[]) => this.store.dispatch([new ProductFoundedInCatalog(res)]));
  }

  searchForProduct(searchQuery, page?) {
    switch (page) {
      case 'next' : {
        this.http
          .post(`https://us-central1-${environment.config.projectId}.cloudfunctions.net/algoliaSearch/search/product`, searchQuery)
          .subscribe((res: any[]) => this.store.dispatch([new ProductNextPageFounded(res)]));
        break;
      }
      default: {
        this.http
          .post(`https://us-central1-${environment.config.projectId}.cloudfunctions.net/algoliaSearch/search/product`, searchQuery)
          .subscribe((res: any[]) => this.store.dispatch([new ProductFounded(res)]));
        break;
      }
    }
  }

}
