import { TestBed } from '@angular/core/testing';

import { WebServiceInterceptor } from './web-service.interceptor';

describe('WebServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WebServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: WebServiceInterceptor = TestBed.inject(WebServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
