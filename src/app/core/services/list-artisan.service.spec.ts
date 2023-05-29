import { TestBed } from '@angular/core/testing';

import { ListArtisanService } from './list-artisan.service';

describe('ListArtisanService', () => {
  let service: ListArtisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListArtisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
