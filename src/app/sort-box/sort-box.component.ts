import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Router} from '@angular/router';

@Component({
  selector: 'cx-sort-box',
  templateUrl: './sort-box.component.html',
  styleUrls: ['./sort-box.component.scss']
})
export class SortBoxComponent implements OnInit {
screenWidth = window.screen.width;
sortBy;
  constructor(private bottomSheetRef: MatBottomSheetRef<SortBoxComponent>, private router: Router) {}

  openLink(event): void {
    this.sortBy = event;
    this.router.navigate([this.router.url.split('?')[0]], { queryParams: { sortBy: event}, queryParamsHandling: 'merge' })
      .then()
      .catch((err) => console.log(err));
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit() {
  }
  addSort(value) {
    this.sortBy = value;
    this.router.navigate([this.router.url.split('?')[0]], { queryParams: { sortBy: value}, queryParamsHandling: 'merge' })
      .then()
      .catch((err) => console.log(err));
  }
}
