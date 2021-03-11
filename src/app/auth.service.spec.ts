import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AuthGrant } from './types';
import { environment } from 'src/environments/environment';
import { mockAuthGrant } from './fixtures/mockAuthGrant';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should call magic_link endpoint with given id and return the magic link response', () => {
    const id = 'abc123';

    let actualResponse: AuthGrant | null = null;
    service.createMagicLink(id).subscribe((response: AuthGrant) => {
      actualResponse = response;
    });

    http
      .expectOne(`${environment.apiBase}/auth/magic_link/${id}`)
      .flush(mockAuthGrant);

    // @ts-ignore
    expect(actualResponse).toEqual(mockAuthGrant);
  });
});
