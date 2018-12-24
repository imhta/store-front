import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '../../home-page/home-page.component';
import {StoreCatalogueComponent} from '../../store-catalogue/store-catalogue.component';
import {InvoicePageComponent} from '../../invoice-page/invoice-page.component';
import {ProductListingComponent} from '../../home-page/product-listing/product-listing.component';
import {ProductPageComponent} from '../../product-page/product-page.component';
import {NotFoundPageComponent} from '../../general-components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'products',
    component: ProductListingComponent
  },
  {
    path: 'product/:id',
    component: ProductPageComponent
  },
  {
    path: 'store/:usn',
    component: StoreCatalogueComponent
  },

  {
    path: 'u/invoice/:id',
    component: InvoicePageComponent
  },

  {
    path: '**',
    component: NotFoundPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
