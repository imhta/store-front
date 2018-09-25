import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetAllProducts} from '../shared/actions/products.actions';
import {Login} from '../shared/actions/auth.actions';

@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch([new GetAllProducts()]);
  }

  login() {
    return this.store.dispatch([new Login()]);
  }
}
