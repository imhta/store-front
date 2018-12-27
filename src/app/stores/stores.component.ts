import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../shared/services/firestore-service/firestore.service';
import {Navigate} from '@ngxs/router-plugin';
import {Store} from '@ngxs/store';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cx-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  storesWithUsn = [];

  constructor(private config: NgbCarouselConfig, private dbService: FirestoreService, private store: Store) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    this.dbService.getStoreWithUsn(20).then((data) => {
      this.storesWithUsn = [];
      data.forEach((doc) => this.storesWithUsn.push(doc.data()));
    });
  }

  ngOnInit() {
  }

  browseStore(usn) {
    this.store.dispatch([new Navigate(['store', usn])]);
  }
}
