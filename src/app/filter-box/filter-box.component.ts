import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'cx-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  screenWidth = window.screen.width;
  availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
  availableOccasions = ['Casuals', 'Formals', 'Party', 'Sports'];
  queryParam;
  filters = {
    location: 'Coimbatore',
    categories: {
      gender: 'All'
    },
    price: {
      inMin: 0,
      inMax: 100000,
      min: 0,
      max: 100000
    },
    size: '',
    occasion: '',
    allowOutOfStock: false
  };

  constructor(
    private dialogRef: MatDialogRef<FilterBoxComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.filters) {
          this.queryParam = JSON.parse(typeof (params.filters) === 'string' ? params.filters : '');
          console.log(this.queryParam);
          this.filters = this.queryParam;
        }
        this.updateFilter();
      });


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
    console.log(this.router.url.split('?')[0]);
    this.router
      .navigate([this.router.url.split('?')[0]], {
        queryParams: {filters: JSON.stringify(this.queryParam ? this.queryParam : this.filters)},
        queryParamsHandling: 'merge'
      })
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
