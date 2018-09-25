import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PwaService} from './shared/services/pwa-service/pwa.service';
import {HomePageComponent} from './home-page/home-page.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AuthState, LoadingState, ProductsState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [PwaService, FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
