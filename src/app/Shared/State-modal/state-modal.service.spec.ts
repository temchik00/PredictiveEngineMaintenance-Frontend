import { TestBed } from '@angular/core/testing';

import { StateModalService } from './state-modal.service';

describe('StateModoalService', () => {
  let service: StateModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
