import {inject, TestBed} from '@angular/core/testing';

import {PwaService} from './pwa.service';

describe('PwaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PwaService]
    });
  });

  it('should be created', inject([PwaService], (service: PwaService) => {
    expect(service).toBeTruthy();
  }));
});
