import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'cx-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  screenWidth = window.screen.width;
  availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
  availableOccasions = ['Casuals', 'Formals', 'Party', 'Sports'];
  filters = {
    location: 'Coimbatore',
    categories: {
      gender: 'men'
    },
    price: {
      inMin: 0,
      inMax: 10000,
      min: 0,
      max: 10000
    },
    size: '',
    occasion: '',
    allowOutOfStock: false
  };

  constructor(
    private dialogRef: MatDialogRef<FilterBoxComponent>,
    private router: Router
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.updateFilter();
  }

  // addSize(size) {
  //   if (this.filters.size.filter((val) => val === size).length > 0) {
  //     this.filters.size.splice(this.filters.size.indexOf(size), 1);
  //   } else {
  //     this.filters.size.push(size);
  //   }
  //   this.updateFilter();
  // }

  updateFilter() {
    this.router
      .navigate([this.router.url.split('?')[0]], {queryParams: {filter: JSON.stringify(this.filters)}, queryParamsHandling: 'merge'})
      .then()
      .catch((err) => console.log(err));
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 100;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }

    return value;
  }
}
