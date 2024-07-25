import { TestBed } from '@angular/core/testing';

import { BbbService } from './bbb.service';

describe('BbbService', () => {
  let service: BbbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BbbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
