import { TestBed } from '@angular/core/testing';

import { MensajesCustomService } from './mensajes-custom.service';

describe('MensajesCustomService', () => {
  let service: MensajesCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
