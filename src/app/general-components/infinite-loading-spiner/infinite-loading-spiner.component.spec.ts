import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfiniteLoadingSpinerComponent} from './infinite-loading-spiner.component';

describe('InfiniteLoadingSpinerComponent', () => {
  let component: InfiniteLoadingSpinerComponent;
  let fixture: ComponentFixture<InfiniteLoadingSpinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteLoadingSpinerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteLoadingSpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
