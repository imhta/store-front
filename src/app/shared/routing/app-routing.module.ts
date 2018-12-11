import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '../../home-page/home-page.component';
import {StoreCatalogueComponent} from '../../store-catalogue/store-catalogue.component';
import {InvoicePageComponent} from '../../invoice-page/invoice-page.component';
import {ProductListingComponent} from '../../home-page/product-listing/product-listing.component';

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
    path: 'u',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'invoice/:id',
        component: InvoicePageComponent
      }
    ]
  },
  {
    path: 'store/:usn',
    component: StoreCatalogueComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
