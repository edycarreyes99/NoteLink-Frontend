import { TestBed } from '@angular/core/testing';

import { NoteLinkHttpInterceptor } from './notelink-http-interceptor.service';

describe('NoteLinkHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NoteLinkHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NoteLinkHttpInterceptor = TestBed.inject(NoteLinkHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
