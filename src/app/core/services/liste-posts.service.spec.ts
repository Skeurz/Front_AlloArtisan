import { TestBed } from '@angular/core/testing';

import { ListePostsService } from './liste-posts.service';

describe('ListePostsService', () => {
  let service: ListePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
