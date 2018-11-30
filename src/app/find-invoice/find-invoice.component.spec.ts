import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FindInvoiceComponent} from './find-invoice.component';

describe('FindInvoiceComponent', () => {
  let component: FindInvoiceComponent;
  let fixture: ComponentFixture<FindInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindInvoiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
