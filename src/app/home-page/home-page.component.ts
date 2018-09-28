import {Component} from '@angular/core';


@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  // isLoggedIn: boolean;
  //
  // constructor(private store: Store) {
  // }
  //
  // ngOnInit() {
  //   this.isLoggedIn = !!this.store.selectSnapshot(AuthState.token);
  // }
  //
  // navigateTo(path: string) {
  //   if (this.isLoggedIn) {
  //     return this.store.dispatch([new LoadingTrue(), new Navigate([path])]);
  //   } else {
  //     console.log('not logged in');
  //   }
  // }

}
