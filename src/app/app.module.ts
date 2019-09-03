import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './shared/routing/app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PwaService} from './shared/services/pwa-service/pwa.service';
import {HomePageComponent} from './home-page/home-page.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FirestoreService} from './shared/services/firestore-service/firestore.service';
import {AuthState} from './shared/state/auth.state';
import {LoadingState} from './shared/state/loading.state';
import {LoadingComponent} from './general-components/loading/loading.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LogoComponent} from './general-components/logo/logo.component';
import {ProductsState} from './shared/state/products.state';
import {NavbarComponent} from './general-components/navbar/navbar.component';
import {ProductListingComponent} from './home-page/product-listing/product-listing.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AuthService} from './shared/services/auth/auth.service';
import {CartPageComponent} from './cart-page/cart-page.component';
import {NgAisModule} from 'angular-instantsearch';
import {StoreCatalogueComponent} from './store-catalogue/store-catalogue.component';
import {StoreCatalogState} from './shared/state/store-catalog.state';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from './shared/services/http/http.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FilterBoxComponent} from './filter-box/filter-box.component';
import {SortBoxComponent} from './sort-box/sort-box.component';
import {FindInvoiceComponent} from './find-invoice/find-invoice.component';
import {InvoicePageComponent} from './invoice-page/invoice-page.component';
import {NoState} from './shared/state/no.state';
import {NgxKjuaModule} from 'ngx-kjua';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {ScrollableDirective} from './shared/directives/scrollable/scrollable.directive';
import {InfiniteLoadingSpinerComponent} from './general-components/infinite-loading-spiner/infinite-loading-spiner.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {FooterComponent} from './general-components/footer/footer.component';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NotFoundPageComponent} from './general-components/not-found-page/not-found-page.component';
import {StoresComponent} from './stores/stores.component';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    ProductListingComponent,
    CartPageComponent,
    StoreCatalogueComponent,
    FilterBoxComponent,
    SortBoxComponent,
    FindInvoiceComponent,
    InvoicePageComponent,
    ScrollableDirective,
    InfiniteLoadingSpinerComponent,
    ProductPageComponent,
    FooterComponent,
    NotFoundPageComponent,
    StoresComponent
  ],
  imports: [
    BrowserModule,
    NgxKjuaModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxsModule.forRoot([AuthState, LoadingState, ProductsState, StoreCatalogState, NoState], {developmentMode: !environment.production}),
    // NgxsLoggerPluginModule.forRoot(),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatRippleModule,
    MatDialogModule,
    ShareButtonsModule,
    MatBottomSheetModule,
    MatListModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgAisModule,
    ApolloModule,
    HttpLinkModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  entryComponents: [FilterBoxComponent, SortBoxComponent],
  providers: [
    PwaService,
    AuthService,
    HttpService,
    FirestoreService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MatBottomSheetRef,
      useValue: {}
    },
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink) {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'https://api-apeast.graphcms.com/v1/cjq9q14shgemh01bn97uwug8x/master'
    //       })
    //     // tslint:disable-next-line:semicolon
    //     }
    //   },
    //   deps: [HttpLink]
    // }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}
