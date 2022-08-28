import { TestBed } from '@angular/core/testing';

import { NtTableGridService } from './nt.table.grid.service';

describe('NtTableGridService', () => {
  let service: NtTableGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NtTableGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
