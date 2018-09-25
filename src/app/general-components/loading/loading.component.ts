import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';

@Component({
  selector: 'cx-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Select('loading') loading$;
  loading: boolean;

  constructor() {
  }

  ngOnInit() {
    this.loading$.subscribe((data) => this.loading = data.valueOf());
  }

}
