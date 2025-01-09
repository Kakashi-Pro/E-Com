import { TestBed } from '@angular/core/testing';

import { ProductcartagoryService } from './productcartagory.service';

describe('ProductcartagoryService', () => {
  let service: ProductcartagoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductcartagoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
