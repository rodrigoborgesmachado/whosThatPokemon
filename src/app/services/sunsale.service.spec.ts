import { TestBed } from '@angular/core/testing';

import { SunSaleService } from './sunsale.service';

describe('SunSaleService', () => {
  let service: SunSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
