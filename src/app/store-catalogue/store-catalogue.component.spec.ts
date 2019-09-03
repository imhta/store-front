import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StoreCatalogueComponent} from './store-catalogue.component';

describe('StoreCatalogueComponent', () => {
  let component: StoreCatalogueComponent;
  let fixture: ComponentFixture<StoreCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreCatalogueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
