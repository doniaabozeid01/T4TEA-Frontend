import { TestBed } from '@angular/core/testing';

import { CallApisService } from './call-apis.service';

describe('CallApisService', () => {
  let service: CallApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
