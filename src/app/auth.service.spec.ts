import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AuthGrant } from './types';
import { environment } from 'src/environments/environment';

const mockMagicLinkResponse: AuthGrant = {
  access_token: 'some-access-token',
  token_type: 'Bearer',
  expires_in: 21600,
  refresh_token: 'some-refresh-token',
  scope: 'magic_link',
  created_at: 1615353517,
};

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
      .flush(mockMagicLinkResponse);

    // @ts-ignore
    expect(actualResponse).toEqual(mockMagicLinkResponse);
  });
});
