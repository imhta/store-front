import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';

@Component({
  selector: 'cx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {

  }


}
