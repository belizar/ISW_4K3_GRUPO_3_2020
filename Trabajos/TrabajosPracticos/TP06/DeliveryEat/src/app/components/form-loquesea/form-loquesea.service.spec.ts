import { TestBed } from '@angular/core/testing';

import { FormLoqueseaService } from './form-loquesea.service';

describe('FormLoqueseaService', () => {
  let service: FormLoqueseaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormLoqueseaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
