import { TestBed } from '@angular/core/testing';

import { ControlGestosService } from './control-gestos.service';

describe('ControlGestosService', () => {
  let service: ControlGestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlGestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
